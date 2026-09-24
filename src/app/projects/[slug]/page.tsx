import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { formatPrice, slugSchema } from "@/lib/property-schema";
export const dynamic = "force-dynamic";
const loadProperty = cache(async (slug: string) => {
  if (!slugSchema.safeParse(slug).success) notFound();
  await connectDB();
  const item = await new PropertyRepository().findBySlug(slug);
  if (!item) notFound();
  return item;
});
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await loadProperty((await params).slug);
  return { title: property.title, description: property.description.slice(0, 160), alternates: { canonical: `/projects/${property.slug}` }, openGraph: { title: property.title, description: property.description.slice(0, 160), images: property.images.slice(0, 1) } };
}
export default async function ProjectDetailsPage({ params }: Props) {
  const item = await loadProperty((await params).slug);
  const images = item.images.length ? item.images : ["/assets/images/building.svg"];
  const specifications = [["Bedrooms", item.bedrooms], ["Bathrooms", item.bathrooms], ["Area (sq ft)", item.sqft], ["Floors", item.floors], ["Occupancy (%)", item.occupancyRate], ["ROI (%)", item.roi]].filter(([, value]) => value !== undefined);
  return <article className="mx-auto max-w-7xl px-6 py-12">
    <Link className="inline-flex min-h-11 items-center underline" href="/projects">← Back to projects</Link>
    <p className="mt-6 text-sm text-muted-foreground">{item.propertyType} · {item.status}</p><h1 className="mt-2 text-4xl font-bold">{item.title}</h1><p className="mt-3">{item.location || item.city}</p>
    <div className="mt-8 grid gap-10 lg:grid-cols-2"><div><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={images[0]} alt={item.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      {images.length > 1 && <div className="mt-4 grid grid-cols-2 gap-4">{images.slice(1).map((src, index) => <a key={`${src}-${index}`} href={src} target="_blank" rel="noreferrer" aria-label={`Open photo ${index + 2} of ${item.title}`} className="relative aspect-[4/3] overflow-hidden rounded-lg"><Image src={src} alt={`${item.title}, photo ${index + 2}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" /></a>)}</div>}</div>
      <div><p className="text-3xl font-semibold">{formatPrice(item.price)}</p><h2 className="mt-8 text-2xl font-semibold">Property overview</h2><p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">{item.description}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.features.map((feature, i) => <li key={`${feature.label}-${i}`} className="rounded-lg border p-4">{feature.label}</li>)}</ul>
        <dl className="mt-6 divide-y">{[...specifications, ["Developer", item.developer || siteName]].map(([label, value]) => <div key={label} className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}</dl>
        <Link href={`/contact-us?property=${encodeURIComponent(item.slug)}`} className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 text-primary-foreground">Enquire about this property</Link>
      </div>
    </div>
  </article>;
}
const siteName = "Extrovate Solutions LLP";
