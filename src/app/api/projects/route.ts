// app/api/properties/route.ts

import { connectDB } from "@/db/mongodb";
import { PropertyController } from "@/controllers/property.controller";

const controller = new PropertyController();

export async function GET() {
  await connectDB();
  const properties = await controller.getProperties();
  return Response.json(properties);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const property = await controller.createProperty(body);
  return Response.json(property);
}
