import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";
const schema = new Schema({ key: { type: String, unique: true, required: true }, count: { type: Number, default: 0 }, expiresAt: { type: Date, required: true } });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default (models.RateLimit as Model<InferSchemaType<typeof schema>> | undefined) ?? model("RateLimit", schema);
