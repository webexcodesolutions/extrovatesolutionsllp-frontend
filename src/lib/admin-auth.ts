import { timingSafeEqual } from "node:crypto";

/** Server-to-server credential. Never expose this token in browser code. */
export function isAdminRequest(request: Request): boolean {
  const expected = process.env.ADMIN_API_TOKEN;
  const provided = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!expected || expected.length < 32 || !provided) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(provided);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function requireAdmin(request: Request) {
  return isAdminRequest(request) ? null : Response.json({ error: "Unauthorized" }, { status: 401 });
}
