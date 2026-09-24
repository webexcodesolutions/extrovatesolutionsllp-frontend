import { z } from "zod";
import { connectDB } from "@/db/mongodb";
import Subscription from "@/models/subscription";
import Outbox from "@/models/outbox";
import { apiError, HttpError, readJson } from "@/lib/api";
import { verifySubscriptionToken } from "@/lib/subscription-token";
export async function POST(request: Request) {
  try {
    const { token, action } = z.object({ token: z.string().max(1000), action: z.enum(["confirm", "unsubscribe"]) }).parse(await readJson(request, 2000));
    const id = verifySubscriptionToken(token, action); if (!id) throw new HttpError(400, "This link is invalid or expired. Please request a new signup email.");
    const db = await connectDB();
    await db.connection.transaction(async session => {
      const record = await Subscription.findById(id).session(session);
      if (!record) throw new HttpError(400, "This subscription is no longer available.");
      if (action === "confirm" && record.status !== "pending") {
        if (record.status === "active") return;
        throw new HttpError(400, "Please sign up again to resubscribe.");
      }
      if (action === "unsubscribe" && record.status === "unsubscribed") return;
      record.status = action === "confirm" ? "active" : "unsubscribed";
      if (action === "confirm") record.confirmedAt = new Date(); else record.unsubscribedAt = new Date();
      await record.save({ session });
      await Outbox.create([{ kind: action === "confirm" ? "subscription.activated" : "subscription.unsubscribed", recordId: record._id }], { session });
    });
    return Response.json({ message: action === "confirm" ? "Your subscription is confirmed." : "You have been unsubscribed." });
  } catch (error) { return apiError(error, "subscription.action"); }
}
