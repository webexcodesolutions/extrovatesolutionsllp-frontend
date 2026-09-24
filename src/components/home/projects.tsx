import Link from "next/link";
import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { PropertyCard } from "@/components/projects/Property-card";
import { formatPrice, type PublicProperty } from "@/lib/property-schema";
export default async function Projects() {
  let properties: PublicProperty[] = [];
  try { await connectDB(); properties = (await new PropertyRepository().findAll({ featured: true }, 1, 3)).items; }
  catch { console.error(JSON.stringify({ event: "featured_properties_unavailable" })); }
  return <section className="mx-auto max-w-7xl px-6 py-16"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl font-semibold">Featured properties</h2><Link className="inline-flex min-h-11 items-center underline" href="/projects">Browse all properties</Link></div>
    {properties.length ? <div className="grid gap-6 md:grid-cols-3">{properties.map(p => <PropertyCard key={p._id} id={p._id} slug={p.slug} image={p.images[0] || "/assets/images/building.svg"} title={p.title} price={formatPrice(p.price)} location={p.location || p.city} tag={p.tag || p.status} features={p.features} />)}</div> : <p className="text-muted-foreground">Browse our portfolio or <Link className="underline" href="/contact-us">contact us</Link> to discuss available properties.</p>}
  </section>;
}
