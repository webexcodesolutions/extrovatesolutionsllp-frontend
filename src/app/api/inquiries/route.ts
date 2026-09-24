import { connectDB } from "@/db/mongodb";
import Inquiry from "@/models/inquiry";
import Outbox from "@/models/outbox";
import { inquirySchema, POLICY_VERSION } from "@/lib/forms";
import { apiError, HttpError, readJson } from "@/lib/api";
import { protectForm } from "@/lib/rate-limit";
import { PropertyRepository } from "@/repositories/property.repository";
import { processOutbox } from "@/lib/process-outbox";
export async function POST(request: Request) {
  try {
    const { website, ...data } = inquirySchema.parse(
      await readJson(request, 16000),
    );
    if (website)
      return Response.json(
        { message: "Your inquiry has been received." },
        { status: 201 },
      );
    const db = await connectDB();
    await protectForm(request, "inquiry", data.email);
    if (
      data.propertySlug &&
      !(await new PropertyRepository().findBySlug(data.propertySlug))
    )
      throw new HttpError(
        400,
        "This property is no longer available. Please submit a general inquiry.",
      );
    // A transaction keeps the lead and its notification durable together.
    await db.connection.transaction(async (session) => {
      const [inquiry] = await Inquiry.create(
        [{ ...data, consentAt: new Date(), policyVersion: POLICY_VERSION }],
        { session },
      );
      await Outbox.create(
        [{ kind: "inquiry.created", recordId: inquiry._id }],
        { session },
      );
    });

    //  Process the outbox
    await processOutbox();
    return Response.json(
      { message: "Your inquiry has been received. Our team will be in touch." },
      { status: 201 },
    );
  } catch (error) {
    return apiError(error, "inquiry.create");
  }
}
