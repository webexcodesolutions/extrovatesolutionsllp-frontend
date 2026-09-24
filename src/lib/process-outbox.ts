import { connectDB } from "@/db/mongodb";
import { sendInquiryAdminEmail } from "@/lib/email";
import Outbox from "@/models/outbox";
import Inquiry from "@/models/inquiry";

async function processInquiryCreated(event: any) {
  const inquiryId = event.payload?.inquiryId;

  if (!inquiryId) {
    throw new Error("Outbox event does not contain inquiryId");
  }

  const inquiry = await Inquiry.findById(inquiryId);

  if (!inquiry) {
    throw new Error(`Inquiry ${inquiryId} not found`);
  }

  await sendInquiryAdminEmail({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    message: inquiry.message,
  });
}

export async function processOutbox() {
  await connectDB();

  let processed = 0;
  let failed = 0;

  // Process maximum 20 events per invocation
  for (let i = 0; i < 20; i++) {
    // Atomically claim ONE pending event
    const event = await Outbox.findOneAndUpdate(
      {
        status: "pending",
      },
      {
        $set: {
          status: "processing",
          processingStartedAt: new Date(),
        },
      },
      {
        sort: {
          createdAt: 1,
        },
        new: true,
      },
    );

    // No pending events left
    if (!event) {
      break;
    }

    try {
      switch (event.type) {
        case "inquiry.created":
          await processInquiryCreated(event);
          break;

        default:
          throw new Error(`Unsupported outbox event type: ${event.type}`);
      }

      // Email successfully sent
      event.status = "processed";
      event.processedAt = new Date();

      await event.save();

      processed++;
    } catch (error) {
      console.error(`Outbox event ${event._id} failed:`, error);

      // Allow the event to be retried
      event.status = "pending";

      await event.save();

      failed++;
    }
  }

  return {
    processed,
    failed,
  };
}
