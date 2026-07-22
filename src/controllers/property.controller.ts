// controllers/property.controller.ts

import { PropertyService } from "@/services/property.service";

interface PropertyData {
  [key: string]: unknown;
}

export class PropertyController {
  private service = new PropertyService();

  async getProperties() {
    return this.service.getProperties();
  }

  async getPropertiesById(id: string) {
    return this.service.getPropertiesById(id);
  }

  async createProperty(data: PropertyData) {
    return this.service.createProperty(data);
  }
}
