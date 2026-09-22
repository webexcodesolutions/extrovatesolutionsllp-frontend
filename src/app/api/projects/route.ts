// app/api/properties/route.ts

import { connectDB } from "@/db/mongodb";
import { PropertyController } from "@/controllers/property.controller";
import { z } from "zod";

const controller = new PropertyController();

const propertySchema = z.object({
  title: z.string().min(2), slug: z.string().min(2).regex(/^[a-z0-9-]+$/), description: z.string().min(10),
  price: z.coerce.number().nonnegative(), propertyType: z.enum(["Residential", "Commercial", "Villa", "Apartment", "Office", "Land"]),
  city: z.string().min(2), location: z.string().optional(), formattedPrice: z.string().optional(), tag: z.string().optional(),
  status: z.string().optional(), images: z.array(z.string()).default([]), features: z.array(z.object({ label: z.string(), icon: z.string() })).default([]),
  bedrooms: z.coerce.number().optional(), bathrooms: z.coerce.number().optional(), sqft: z.coerce.number().optional(), developer: z.string().optional(),
  isFeatured: z.boolean().optional(), displayOrder: z.coerce.number().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(48, Math.max(1, Number(searchParams.get("limit")) || 9));
    const numberParam = (name: string) => { const value = searchParams.get(name); return value && !Number.isNaN(Number(value)) ? Number(value) : undefined; };
    await connectDB();
    const result = await controller.getProperties({ city: searchParams.get("city") || undefined, propertyType: searchParams.get("propertyType") || undefined, status: searchParams.get("status") || undefined, minPrice: numberParam("minPrice"), maxPrice: numberParam("maxPrice"), featured: searchParams.get("featured") === "true" }, page, limit);
    return Response.json({ ...result, page, limit, totalPages: Math.ceil(result.total / limit) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load properties" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = propertySchema.parse(await request.json());
    await connectDB();
    const property = await controller.createProperty(body);
    return Response.json(property, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof z.ZodError ? "Invalid property data" : error instanceof Error ? error.message : "Unable to create property" }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
