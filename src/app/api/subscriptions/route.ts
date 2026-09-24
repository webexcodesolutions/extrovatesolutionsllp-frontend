import { connectDB } from "@/db/mongodb";
import Subscription from "@/models/subscription";
import Outbox from "@/models/outbox";
import { subscriptionSchema, POLICY_VERSION } from "@/lib/forms";
import { apiError, HttpError, readJson } from "@/lib/api";
import { protectForm } from "@/lib/rate-limit";
export async function POST(request: Request) {
  try {
    const { email, website } = subscriptionSchema.parse(await readJson(request, 4000));
    const message = "If confirmation is needed, you’ll receive an email with the next step.";
    if (website) return Response.json({ message }, { status: 202 });
    if (!process.env.NOTIFICATION_WEBHOOK_URL || (process.env.SUBSCRIPTION_TOKEN_SECRET?.length || 0) < 32) throw new HttpError(503, "Newsletter signup is temporarily unavailable. Please try again later.");
    const db = await connectDB(); await protectForm(request, "subscription", email);
    await db.connection.transaction(async session => {
      const existing = await Subscription.findOne({ email }).session(session);
      if (existing?.status === "active") return;
      const record = await Subscription.findOneAndUpdate({ email }, { status: "pending", consentAt: new Date(), policyVersion: POLICY_VERSION, $unset: { confirmedAt: 1, unsubscribedAt: 1 } }, { upsert: true, new: true, session });
      await Outbox.create([{ kind: "subscription.confirm", recordId: record._id }], { session });
    });
    return Response.json({ message }, { status: 202 });
  } catch (error) { return apiError(error, "subscription.create"); }
}
