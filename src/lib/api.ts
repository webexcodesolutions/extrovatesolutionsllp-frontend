import { z } from "zod";
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
export async function readJson(request: Request, maxBytes = 64_000): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new HttpError(415, "Send JSON content.");
  if (Number(request.headers.get("content-length")) > maxBytes) throw new HttpError(413, "Request is too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "A JSON body is required.");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new HttpError(413, "Request is too large."); }
      chunks.push(value);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { throw new HttpError(400, "Invalid JSON."); }
  } finally { reader.releaseLock(); }
}
export function apiError(error: unknown, context: string) {
  if (error instanceof HttpError) return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof z.ZodError) return Response.json({ error: "Please check the submitted fields.", fields: z.flattenError(error).fieldErrors }, { status: 400 });
  if (typeof error === "object" && error && "code" in error && error.code === 11000) return Response.json({ error: "This record already exists." }, { status: 409 });
  // Deliberately omit request bodies, credentials and raw database messages.
  console.error(JSON.stringify({ event: "request_failed", context, kind: error instanceof Error ? error.name : "UnknownError" }));
  return Response.json({ error: "This service is temporarily unavailable. Please try again." }, { status: 503 });
}
