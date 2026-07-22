// services/property.service.ts

import { PropertyRepository } from "@/repositories/property.repository";

type CreatePropertyData = Record<string, unknown>;

export class PropertyService {
  private repository = new PropertyRepository();

  async getProperties() {
    return this.repository.findAll();
  }
  async getPropertiesById(id: string) {
    return this.repository.findById(id);
  }

  async createProperty(data: CreatePropertyData) {
    return this.repository.create(data);
  }
}
