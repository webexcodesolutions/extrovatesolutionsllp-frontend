import Property from "@/models/property";
import { propertySchema, type PropertyFilters, type PropertyInput, type PublicProperty } from "@/lib/property-schema";
export type { PropertyFilters } from "@/lib/property-schema";
const projection = "title slug description price propertyType status tag city location developer images features bedrooms bathrooms sqft floors occupancyRate roi isFeatured displayOrder";

function serialize(value: unknown): PublicProperty {
  const record = value as Record<string, unknown>;
  // Normalize legacy features without exposing internal database fields.
  const icons: Record<string, string> = { bed: "beds", BedDouble: "beds", bath: "baths", Bath: "baths", size: "area", Maximize: "area" };
  const features = Array.isArray(record.features) ? record.features.flatMap((feature) => {
    const f = feature as Record<string, unknown>;
    const label = typeof f.label === "string" ? f.label : [f.value, f.title].filter(Boolean).join(" ");
    if (!label) return [];
    const icon = typeof f.icon === "string" ? (icons[f.icon] || f.icon) : "type";
    return [{ label, icon }];
  }) : [];
  return { ...propertySchema.parse({ ...record, features, location: record.location || undefined, developer: record.developer || undefined }), _id: String(record._id) };
}

export class PropertyRepository {
  async findAll(filters: Partial<PropertyFilters>, page: number, limit: number) {
    const query: Record<string, unknown> = {};
    if (filters.city) query.cityKey = filters.city.trim().toLocaleLowerCase("en-IN");
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.status) query.status = filters.status;
    if (filters.featured) query.isFeatured = true;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) query.price = { ...(filters.minPrice !== undefined ? { $gte: filters.minPrice } : {}), ...(filters.maxPrice !== undefined ? { $lte: filters.maxPrice } : {}) };
    const [items, total] = await Promise.all([Property.find(query).select(projection).sort({ displayOrder: 1, createdAt: -1, _id: 1 }).skip((page - 1) * limit).limit(limit).lean(), Property.countDocuments(query)]);
    return { items: items.map(serialize), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
  async findBySlug(slug: string) {
    const property = await Property.findOne({ slug }).select(projection).lean();
    return property ? serialize(property) : null;
  }
  async create(data: PropertyInput) { return serialize((await Property.create(data)).toObject()); }
  async update(slug: string, data: PropertyInput) {
    const property = await Property.findOneAndUpdate({ slug }, { ...data, cityKey: data.city.toLocaleLowerCase("en-IN") }, { new: true, runValidators: true }).select(projection).lean();
    return property ? serialize(property) : null;
  }
  async delete(slug: string) { return Property.findOneAndDelete({ slug }); }
}
