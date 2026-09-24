import { createHash } from "node:crypto";
import RateLimit from "@/models/rate-limit";
import { HttpError } from "@/lib/api";
export async function rateLimit(key: string, maximum: number, windowMs = 3600000) {
  const window = Math.floor(Date.now() / windowMs);
  const hash = createHash("sha256").update(`${key}:${window}`).digest("hex");
  const update = { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * windowMs) } };
  let record;
  try { record = await RateLimit.findOneAndUpdate({ key: hash }, update, { upsert: true, new: true }); }
  catch (error) {
    if (!(typeof error === "object" && error && "code" in error && error.code === 11000)) throw error;
    record = await RateLimit.findOneAndUpdate({ key: hash }, { $inc: { count: 1 } }, { new: true });
  }
  if (!record || record.count > maximum) throw new HttpError(429, "Too many requests. Please try again later.");
}
export async function protectForm(request: Request, category: string, email: string) {
  // Configure only a header overwritten by a trusted reverse proxy. Never trust arbitrary X-Forwarded-For.
  const header = process.env.RATE_LIMIT_IP_HEADER;
  const ip = header ? request.headers.get(header)?.slice(0, 100) : null;
  await rateLimit(`${category}:global`, 1000);
  if (ip) await rateLimit(`${category}:ip:${ip}`, 20);
  await rateLimit(`${category}:email:${email}`, 3);
}
