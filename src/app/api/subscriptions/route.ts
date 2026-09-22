import { z } from "zod";
import { connectDB } from "@/db/mongodb";
import Subscription from "@/models/subscription";

export async function POST(request: Request) {
  try {
    const { email } = z.object({ email: z.string().trim().email() }).parse(await request.json());
    await connectDB();
    await Subscription.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
    return Response.json({ message: "You are subscribed." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof z.ZodError ? "Enter a valid email address." : error instanceof Error ? error.message : "Unable to subscribe" }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
