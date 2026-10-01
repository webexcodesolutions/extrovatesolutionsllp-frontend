import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { connectDB } from "@/db/mongodb";
import Property from "@/models/property";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about-us", "/projects", "/contact-us", "/loan-assistance", "/privacy-policy", "/terms-of-service", "/cookie-policy"];
  // Fail visibly on database errors, instead of silently publishing an incomplete sitemap.
  await connectDB();
  const properties = await Property.find().select("slug updatedAt").sort({ _id: 1 }).limit(49000).lean();
  return [...pages.map(path => ({ url: `${site.url}${path}` })), ...properties.map(p => ({ url: `${site.url}/projects/${p.slug}`, lastModified: p.updatedAt }))];
}
