import { model, models, Schema } from "mongoose";

const SubscriptionSchema = new Schema({ email: { type: String, required: true, unique: true, lowercase: true, trim: true } }, { timestamps: true });

export default models.Subscription || model("Subscription", SubscriptionSchema);
