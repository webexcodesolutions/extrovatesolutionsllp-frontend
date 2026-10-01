import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { propertySchema, slugSchema } from "@/lib/property-schema";
import { requireAdmin } from "@/lib/admin-auth";
import { apiError, readJson } from "@/lib/api";
const repository = new PropertyRepository();
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: Context) {
  try {
    const slug = slugSchema.parse((await params).id); await connectDB();
    const property = await repository.findBySlug(slug);
    return property ? Response.json(property) : Response.json({ error: "Property not found" }, { status: 404 });
  } catch (error) { return apiError(error, "properties.detail"); }
}
export async function PUT(request: Request, { params }: Context) {
  const denied = requireAdmin(request); if (denied) return denied;
  try {
    const slug = slugSchema.parse((await params).id);
    const data = propertySchema.parse(await readJson(request)); await connectDB();
    const property = await repository.update(slug, data);
    return property ? Response.json(property) : Response.json({ error: "Property not found" }, { status: 404 });
  } catch (error) { return apiError(error, "properties.update"); }
}
export async function DELETE(request: Request, { params }: Context) {
  const denied = requireAdmin(request); if (denied) return denied;
  try {
    const slug = slugSchema.parse((await params).id); await connectDB();
    return await repository.delete(slug) ? new Response(null, { status: 204 }) : Response.json({ error: "Property not found" }, { status: 404 });
  } catch (error) { return apiError(error, "properties.delete"); }
}
