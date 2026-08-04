import { PropertyController } from "@/controllers/property.controller";

const controller = new PropertyController();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const property = await controller.getPropertiesById(id);

  return Response.json(property);
}
