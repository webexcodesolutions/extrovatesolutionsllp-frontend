import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import type { PublicProperty } from "@/lib/property-schema";
import PortfolioCarousel from "./portfolio-carousel";

export default async function Projects() {
  let properties: PublicProperty[] = [];
  try {
    await connectDB();
    properties = (await new PropertyRepository().findAll({ featured: true }, 1, 9)).items;
  } catch {
    console.error(JSON.stringify({ event: "featured_properties_unavailable" }));
  }
  return <section className="bg-background py-20 sm:py-24"><div className="mx-auto max-w-7xl px-6"><PortfolioCarousel properties={properties} /></div></section>;
}
