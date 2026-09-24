import {
  model,
  models,
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";
import {
  FEATURE_ICONS,
  PROPERTY_STATUSES,
  PROPERTY_TAGS,
  PROPERTY_TYPES,
} from "../lib/property-schema";

const propertySchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 10000 },
    price: { type: Number, required: true, min: 0 },
    propertyType: { type: String, required: true, enum: PROPERTY_TYPES },
    status: { type: String, enum: PROPERTY_STATUSES, default: "Available" },
    tag: { type: String, enum: PROPERTY_TAGS },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    cityKey: { type: String, index: true },
    location: { type: String, default: "" },
    developer: { type: String, default: "Extrovate Solutions LLP" },
    images: [String],
    features: [
      new Schema(
        {
          label: { type: String, required: true },
          icon: { type: String, required: true, enum: FEATURE_ICONS },
        },
        { _id: false },
      ),
    ],
    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    sqft: { type: Number, min: 0 },
    floors: { type: Number, min: 0 },
    occupancyRate: { type: Number, min: 0, max: 100 },
    roi: Number,
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);
propertySchema.pre("validate", function () {
  this.cityKey = this.city.toLocaleLowerCase("en-IN");
});
propertySchema.index({ isFeatured: 1, displayOrder: 1, createdAt: -1, _id: 1 });
propertySchema.index({ propertyType: 1, status: 1, cityKey: 1, price: 1 });
propertySchema.index({ displayOrder: 1, createdAt: -1, _id: 1 });
type PropertyDocument = InferSchemaType<typeof propertySchema>;
const Property =
  (models.Property as Model<PropertyDocument> | undefined) ??
  model("Property", propertySchema);
export default Property;
