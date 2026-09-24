import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
const schema = new Schema({
  name: { type: String, required: true }, email: { type: String, required: true }, phone: { type: String, required: true },
  interest: { type: String, required: true }, message: { type: String, required: true },
  propertySlug: String, consent: { type: Boolean, required: true }, consentAt: { type: Date, required: true }, policyVersion: { type: String, required: true },
  status: { type: String, enum: ["new", "contacted", "closed"], default: "new", index: true },
}, { timestamps: true });
schema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 86400 });
export default (models.Inquiry as Model<InferSchemaType<typeof schema>> | undefined) ?? model("Inquiry", schema);
