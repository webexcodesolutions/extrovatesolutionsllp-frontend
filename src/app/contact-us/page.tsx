import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { slugSchema } from "@/lib/property-schema";
export const metadata: Metadata = { title: "Contact us", description: "Discuss a property, viewing or real estate inquiry with our team.", alternates: { canonical: "/contact-us" } };
export default async function ContactUs({ searchParams }: { searchParams: Promise<{ property?: string }> }) {
  const { property } = await searchParams; let item;
  if (property && slugSchema.safeParse(property).success) {
    await connectDB(); item = await new PropertyRepository().findBySlug(property);
  }
  return <>{property && !item && <p role="status" className="mx-auto max-w-7xl px-6 pt-6">The selected property is unavailable. You can still send a general inquiry.</p>}<ContactSection propertySlug={item?.slug} propertyTitle={item?.title} /></>;
}
