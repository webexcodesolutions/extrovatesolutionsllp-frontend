// services/property.service.ts

import { PropertyRepository } from "@/repositories/property.repository";
import type { PropertyFilters } from "@/repositories/property.repository";

type CreatePropertyData = Record<string, unknown>;

export class PropertyService {
  private repository = new PropertyRepository();

  async getProperties(filters: PropertyFilters, page: number, limit: number) {
    return this.repository.findAll(filters, page, limit);
  }
  async getPropertiesById(id: string) {
    return this.repository.findById(id);
  }

  async createProperty(data: CreatePropertyData) {
    return this.repository.create(data);
  }
}
