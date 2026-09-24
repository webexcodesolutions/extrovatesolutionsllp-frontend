import {
  model,
  models,
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";
const schema = new Schema(
  {
    kind: {
      type: String,
      enum: [
        "inquiry.created",
        "subscription.confirm",
        "subscription.activated",
        "subscription.unsubscribed",
      ],
      required: true,
    },
    recordId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
    },
    attempts: { type: Number, default: 0 },
    nextAttempt: { type: Date, default: Date.now },
    leaseUntil: Date,
  },
  { timestamps: true },
);
schema.index({ status: 1, nextAttempt: 1 });
export default (models.Outbox as
  | Model<InferSchemaType<typeof schema>>
  | undefined) ?? model("Outbox", schema);
