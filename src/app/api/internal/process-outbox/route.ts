import { NextRequest, NextResponse } from "next/server";
import { processOutbox } from "@/lib/process-outbox";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      {
        error: "CRON_SECRET is not configured",
      },
      {
        status: 500,
      },
    );
  }

  if (authorization !== `Bearer ${expectedSecret}`) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const result = await processOutbox();

  return NextResponse.json({
    success: true,
    ...result,
  });
}
