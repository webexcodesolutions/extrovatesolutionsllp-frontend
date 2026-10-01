import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { propertyQuerySchema, propertySchema } from "@/lib/property-schema";
import { requireAdmin } from "@/lib/admin-auth";
import { apiError, readJson } from "@/lib/api";
const repository = new PropertyRepository();
export async function GET(request: Request) {
  try {
    const { page, limit, ...filters } = propertyQuerySchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    await connectDB();
    return Response.json(await repository.findAll(filters, page, limit));
  } catch (error) {
    return apiError(error, "properties.list");
  }
}
export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const data = propertySchema.parse(await readJson(request));
    await connectDB();
    return Response.json(await repository.create(data), { status: 201 });
  } catch (error) {
    return apiError(error, "properties.create");
  }
}
