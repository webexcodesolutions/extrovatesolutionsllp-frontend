// repositories/property.repository.ts

import Property from "@/models/property";

export class PropertyRepository {
  async findAll() {
    return Property.find();
  }

  async findById(id: string) {
    return Property.findById(id);
  }

  async create(data: Partial<typeof Property>) {
    return Property.create(data);
  }
}
