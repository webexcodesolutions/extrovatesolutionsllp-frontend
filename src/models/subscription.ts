import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
const schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  status: { type: String, enum: ["pending", "active", "unsubscribed"], default: "pending" },
  consentAt: Date, policyVersion: String, confirmedAt: Date, unsubscribedAt: Date,
}, { timestamps: true });
export default (models.Subscription as Model<InferSchemaType<typeof schema>> | undefined) ?? model("Subscription", schema);
