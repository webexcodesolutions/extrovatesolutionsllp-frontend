import { connectDB } from "@/db/mongodb";
import { sendInquiryAdminEmail } from "@/lib/email";
import Outbox from "@/models/outbox";
import Inquiry from "@/models/inquiry";

const batchSize = 20;
const leaseMs = 2 * 60 * 1000;
const maxAttempts = 5;

export async function processOutbox() {
  await connectDB();
  let processed = 0;
  let failed = 0;

  for (let i = 0; i < batchSize; i++) {
    const now = new Date();
    // Only inquiry events are active. Older newsletter events remain untouched.
    const event = await Outbox.findOneAndUpdate(
      {
        kind: "inquiry.created",
        nextAttempt: { $lte: now },
        $or: [
          { status: "pending" },
          { status: "processing", leaseUntil: { $lte: now } },
        ],
      },
      {
        $set: { status: "processing", leaseUntil: new Date(now.getTime() + leaseMs) },
        $inc: { attempts: 1 },
      },
      { sort: { nextAttempt: 1, createdAt: 1 }, new: true },
    );
    if (!event) break;

    try {
      const inquiry = await Inquiry.findById(event.recordId);
      if (!inquiry) throw new Error("Inquiry record is unavailable");
      await sendInquiryAdminEmail({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        property: inquiry.propertySlug || undefined,
        message: inquiry.message,
      });
      await Outbox.updateOne(
        { _id: event._id, status: "processing", leaseUntil: event.leaseUntil },
        { $set: { status: "delivered" }, $unset: { leaseUntil: 1 } },
      );
      processed++;
    } catch (error) {
      const attempts = event.attempts;
      const exhausted = attempts >= maxAttempts;
      const backoffMs = Math.min(60 * 60 * 1000, 60 * 1000 * 2 ** (attempts - 1));
      await Outbox.updateOne(
        { _id: event._id, status: "processing", leaseUntil: event.leaseUntil },
        {
          $set: { status: exhausted ? "failed" : "pending", nextAttempt: new Date(Date.now() + backoffMs) },
          $unset: { leaseUntil: 1 },
        },
      );
      console.error(JSON.stringify({ event: "inquiry_notification_failed", id: String(event._id), attempt: attempts, kind: error instanceof Error ? error.name : "UnknownError" }));
      failed++;
    }
  }
  return { processed, failed };
}
