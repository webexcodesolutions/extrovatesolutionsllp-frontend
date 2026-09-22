// repositories/property.repository.ts

import Property from "@/models/property";

export type PropertyFilters = { city?: string; propertyType?: string; status?: string; minPrice?: number; maxPrice?: number; featured?: boolean };

export class PropertyRepository {
  async findAll(filters: PropertyFilters, page: number, limit: number) {
    const query: Record<string, unknown> = {};
    if (filters.city) query.city = new RegExp(`^${escapeRegExp(filters.city)}$`, "i");
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.status) query.status = filters.status;
    if (filters.featured) query.isFeatured = true;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) query.price = { ...(filters.minPrice !== undefined ? { $gte: filters.minPrice } : {}), ...(filters.maxPrice !== undefined ? { $lte: filters.maxPrice } : {}) };
    const [items, total] = await Promise.all([Property.find(query).sort({ displayOrder: 1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Property.countDocuments(query)]);
    return { items, total };
  }

  async findById(id: string) {
    return Property.findOne({ slug: id }).lean();
  }

  async create(data: Record<string, unknown>) {
    return Property.create(data);
  }
}

function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
