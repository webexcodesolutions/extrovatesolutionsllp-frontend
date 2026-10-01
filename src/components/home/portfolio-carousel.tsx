"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatPrice, type PublicProperty } from "@/lib/property-schema";

const inspiration = [
  { image: "/assets/images/the-obsidian-estate.svg", title: "Light-filled interiors" },
  { image: "/assets/images/azure-sky-penthouse.svg", title: "Architectural details" },
  { image: "/assets/images/the-garden-sanctuary.svg", title: "Green spaces" },
  { image: "/assets/images/amber-residences.svg", title: "Contemporary homes" },
  { image: "/assets/images/modern-building.svg", title: "Commercial spaces" },
];

export default function PortfolioCarousel({ properties }: { properties: PublicProperty[] }) {
  const fallback = inspiration.slice(0, Math.max(0, 5 - properties.length));
  return <Carousel opts={{ align: "start", loop: properties.length + fallback.length > 3, slidesToScroll: 1 }} className="outline-none" tabIndex={0} aria-label="Property and architectural image carousel">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div><p className="eyebrow">Explore the portfolio</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Architectural Masterpieces</h2><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Explore available listings and the spaces that inspire our work.</p></div>
      <div className="flex items-center gap-3"><Link href="/projects" className="inline-flex min-h-11 items-center gap-2 pr-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground hover:underline">View all projects <ArrowUpRight size={16} /></Link><CarouselPrevious className="static size-10 translate-y-0 border-primary/20 bg-card text-primary" aria-label="Previous property" /><CarouselNext className="static size-10 translate-y-0 border-primary/20 bg-card text-primary" aria-label="Next property" /></div>
    </div>
    <CarouselContent className="-ml-4 pb-5">
      {properties.map(property => <CarouselItem key={property._id} className="basis-[90%] pl-4 sm:basis-1/2 lg:basis-1/3"><Link href={`/projects/${property.slug}`} className="group block h-full overflow-hidden rounded-sm border border-border bg-card shadow-lg shadow-primary/5 transition-shadow hover:shadow-xl hover:shadow-primary/10"><div className="relative aspect-[1.48/1] overflow-hidden"><Image src={property.images[0] || "/assets/images/building.svg"} alt={property.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">{property.tag || property.status}</span></div><div className="p-5"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-base font-semibold text-primary">{property.title}</h3><span className="text-sm font-medium text-primary">{formatPrice(property.price)}</span></div><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={13} />{property.location || property.city}</p><div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 text-xs text-primary">{property.bedrooms !== undefined && <span>{property.bedrooms} beds</span>}{property.bathrooms !== undefined && <span>{property.bathrooms} baths</span>}{property.sqft !== undefined && <span>{property.sqft.toLocaleString("en-IN")} sq ft</span>}{!property.bedrooms && !property.bathrooms && !property.sqft && <span>View property details <ArrowRight size={12} className="inline" /></span>}</div></div></Link></CarouselItem>)}
      {fallback.map(item => <CarouselItem key={item.image} className="basis-[90%] pl-4 sm:basis-1/2 lg:basis-1/3"><div className="h-full overflow-hidden rounded-sm border border-border bg-card shadow-lg shadow-primary/5"><div className="relative aspect-[1.48/1]"><Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /><span className="absolute left-4 top-4 bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">Design inspiration</span></div><div className="p-5"><h3 className="text-base font-semibold text-primary">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">Illustrative imagery</p><Link href="/projects" className="mt-4 inline-flex min-h-11 items-center gap-1 border-t border-border text-xs font-semibold uppercase tracking-wider text-primary hover:underline">Browse available properties <ArrowUpRight size={14} /></Link></div></div></CarouselItem>)}
    </CarouselContent>
    <p className="sr-only">Use the previous and next buttons, swipe, or focus this carousel and use the left and right arrow keys.</p>
  </Carousel>;
}
