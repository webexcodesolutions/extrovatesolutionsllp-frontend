// models/Property.ts

import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    formattedPrice: {
      type: String,
      default: "",
    },

    tag: {
      type: String,
      enum: [
        "NEW CONSTRUCTION",
        "INVESTMENT OPPORTUNITY",
        "UNDER CONSTRUCTION",
      ],
    },

    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "Villa", "Apartment", "Office"],
    },

    status: {
      type: String,
      enum: ["Available", "Sold", "Upcoming"],
      default: "Available",
    },

    city: String,

    images: [
      {
        type: String,
      },
    ],

    // Card Features
    features: [
      {
        title: String,
        value: String,
      },
    ],

    // Residential
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,

    // Commercial
    floors: Number,
    occupancyRate: Number,
    roi: Number,

    isFeatured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
