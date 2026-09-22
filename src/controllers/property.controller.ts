// controllers/property.controller.ts

import { PropertyService } from "@/services/property.service";
import type { PropertyFilters } from "@/repositories/property.repository";

interface PropertyData {
  [key: string]: unknown;
}

export class PropertyController {
  private service = new PropertyService();

  async getProperties(filters: PropertyFilters, page: number, limit: number) {
    return this.service.getProperties(filters, page, limit);
  }

  async getPropertiesById(id: string) {
    return this.service.getPropertiesById(id);
  }

  async createProperty(data: PropertyData) {
    return this.service.createProperty(data);
  }
}
