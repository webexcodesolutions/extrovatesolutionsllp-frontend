import Link from "next/link";
import { PropertyCard } from "./Property-card";
import { formatPrice, type PropertyResults } from "@/lib/property-schema";
export default function ProjectsListing({ data, query }: { data: PropertyResults; query: Record<string, string> }) {
  const pageLink = (page: number) => `/projects?${new URLSearchParams({ ...query, page: String(page) })}`;
  return <section className="mx-auto max-w-7xl px-6 py-10" aria-label="Property results">
    <p role="status" className="mb-6 text-muted-foreground">{data.total} {data.total === 1 ? "property" : "properties"} found</p>
    {!data.items.length && <p className="rounded-xl border p-8">No properties match these filters. Try another location or budget.</p>}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.items.map(property => <PropertyCard key={property._id} id={property._id} slug={property.slug} image={property.images[0] || "/assets/images/building.svg"} title={property.title} price={formatPrice(property.price)} location={property.location || property.city} tag={property.tag || property.status} features={property.features} />)}</div>
    {data.totalPages > 1 && <nav aria-label="Property pages" className="mt-10 flex items-center justify-center gap-5">
      {data.page > 1 && <Link className="rounded-md border p-3" href={pageLink(data.page - 1)}>Previous</Link>}
      <span>Page {data.page} of {data.totalPages}</span>
      {data.page < data.totalPages && <Link className="rounded-md border p-3" href={pageLink(data.page + 1)}>Next</Link>}
    </nav>}
  </section>;
}
