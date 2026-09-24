import { z } from "zod";
export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100), email: emailSchema,
  phone: z.string().trim().min(6).max(30).regex(/^[+\d\s().-]+$/, "Enter a valid phone number."),
  interest: z.enum(["Residential", "Commercial", "Villa", "Apartment", "Office", "Land", "Loan assistance", "General inquiry"]),
  message: z.string().trim().min(10).max(2000), consent: z.literal(true),
  propertySlug: z.string().max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  website: z.string().max(200).optional(),
});
export const subscriptionSchema = z.object({ email: emailSchema, consent: z.literal(true), website: z.string().max(200).optional() });
export const POLICY_VERSION = "2026-09-24";
