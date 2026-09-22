import { z } from "zod";
import { connectDB } from "@/db/mongodb";
import Inquiry from "@/models/inquiry";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.string().trim().email(), phone: z.string().trim().min(6).max(30),
  interest: z.string().trim().min(2).max(80), message: z.string().trim().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    const data = inquirySchema.parse(await request.json());
    await connectDB();
    const inquiry = await Inquiry.create(data);
    return Response.json({ id: inquiry._id, message: "Your inquiry has been received." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof z.ZodError ? "Please complete all fields with valid information." : error instanceof Error ? error.message : "Unable to submit inquiry" }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
