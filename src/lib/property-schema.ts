import { z } from "zod";

export const PROPERTY_TYPES = ["Residential", "Commercial", "Villa", "Apartment", "Office", "Land"] as const;
export const PROPERTY_STATUSES = ["Available", "Sold", "Upcoming"] as const;
export const PROPERTY_TAGS = ["NEW CONSTRUCTION", "INVESTMENT OPPORTUNITY", "UNDER CONSTRUCTION"] as const;
export const FEATURE_ICONS = ["beds", "baths", "area", "parking", "type", "status", "possession", "view", "eco", "villa", "office", "capacity"] as const;
const text = (max: number) => z.string().trim().min(1).max(max);
const measurement = z.number().finite().nonnegative();
export const slugSchema = z.string().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const imageSchema = z.string().max(2048).refine((value) => {
  if (/^\/(?!\/)[a-zA-Z0-9/_ .-]+\.(?:webp|avif|png|jpg|jpeg|svg)$/.test(value) && !value.includes("..")) return true;
  try {
    const url = new URL(value);
    const hosts = (process.env.IMAGE_HOSTS || "").split(",").map((host) => host.trim()).filter(Boolean);
    return url.protocol === "https:" && !url.username && !url.password && !url.port && hosts.includes(url.hostname) && /\.(?:webp|avif|png|jpe?g)$/i.test(url.pathname);
  } catch { return false; }
}, "Use a local image or an HTTPS image from an approved host.");
export const propertyFeatureSchema = z.object({ label: text(100), icon: z.enum(FEATURE_ICONS) });
export const propertySchema = z.object({
  title: text(160), slug: slugSchema, description: text(10000).min(10),
  price: measurement, propertyType: z.enum(PROPERTY_TYPES), city: text(100),
  location: text(250).optional(), developer: text(160).optional(),
  tag: z.enum(PROPERTY_TAGS).optional(), status: z.enum(PROPERTY_STATUSES).default("Available"),
  images: z.array(imageSchema).max(20).default([]),
  features: z.array(propertyFeatureSchema).max(20).default([]),
  bedrooms: measurement.int().max(100).optional(), bathrooms: measurement.int().max(100).optional(),
  sqft: measurement.optional(), floors: measurement.int().max(300).optional(),
  occupancyRate: measurement.max(100).optional(), roi: z.number().finite().min(-100).max(1000).optional(),
  isFeatured: z.boolean().default(false), displayOrder: z.number().int().min(0).max(100000).default(0),
});
const optionalNumber = z.preprocess((value) => value === "" || value == null ? undefined : value, z.coerce.number().finite().nonnegative().optional());
export const propertyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(9),
  city: text(100).optional(), propertyType: z.enum(PROPERTY_TYPES).optional(), status: z.enum(PROPERTY_STATUSES).optional(),
  minPrice: optionalNumber, maxPrice: optionalNumber,
  featured: z.enum(["true", "false"]).optional().transform((value) => value === "true"),
}).refine((data) => data.minPrice === undefined || data.maxPrice === undefined || data.minPrice <= data.maxPrice, { message: "Minimum budget must not exceed maximum budget.", path: ["maxPrice"] });
export type PropertyInput = z.infer<typeof propertySchema>;
export type PropertyFeature = z.infer<typeof propertyFeatureSchema>;
export type PropertyFilters = Omit<z.infer<typeof propertyQuerySchema>, "page" | "limit">;
export type PublicProperty = PropertyInput & { _id: string };
export type PropertyResults = { items: PublicProperty[]; total: number; page: number; limit: number; totalPages: number };
export const formatPrice = (price: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
