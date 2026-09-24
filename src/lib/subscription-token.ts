import { createHmac, timingSafeEqual } from "node:crypto";
export function createSubscriptionToken(id: string, action: "confirm" | "unsubscribe", now = Date.now()) {
  const secret = process.env.SUBSCRIPTION_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error("Subscription signing is not configured");
  const payload = Buffer.from(JSON.stringify({ id, action, expires: now + (action === "confirm" ? 7 : 365) * 86400000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}
export function verifySubscriptionToken(token: string, action: "confirm" | "unsubscribe", now = Date.now()): string | null {
  try {
    const secret = process.env.SUBSCRIPTION_TOKEN_SECRET;
    if (!secret || secret.length < 32 || token.length > 1000) return null;
    const [payload, signature, extra] = token.split("."); if (extra || !payload || !signature) return null;
    const actual = Buffer.from(signature, "base64url"); const expected = createHmac("sha256", secret).update(payload).digest();
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.action === action && data.expires > now && /^[a-f\d]{24}$/i.test(data.id) ? data.id : null;
  } catch { return null; }
}
