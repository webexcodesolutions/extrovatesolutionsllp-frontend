import { connectDB } from "@/db/mongodb";
import { PropertyController } from "@/controllers/property.controller";

const controller = new PropertyController();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectDB();
    const property = await controller.getPropertiesById(id);
    if (!property) return Response.json({ error: "Property not found" }, { status: 404 });
    return Response.json(property);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load property" }, { status: 503 });
  }
}
