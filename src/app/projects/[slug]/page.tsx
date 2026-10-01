import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, ArrowRight, Bath, BedDouble, Building2, Check, MapPin, Maximize } from "lucide-react";
import PropertyInquiryForm from "@/components/projects/PropertyInquiryForm";
import { connectDB } from "@/db/mongodb";
import { PropertyRepository } from "@/repositories/property.repository";
import { formatPrice, slugSchema, type PublicProperty } from "@/lib/property-schema";

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
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/projects/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.slice(0, 1),
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const item = await loadProperty((await params).slug);
  const images = item.images.length ? item.images : ["/assets/images/building.svg"];
  const specifications = [
    { label: "Bedrooms", value: item.bedrooms, icon: BedDouble },
    { label: "Bathrooms", value: item.bathrooms, icon: Bath },
    { label: "Area", value: item.sqft ? `${item.sqft.toLocaleString("en-IN")} sq ft` : undefined, icon: Maximize },
    { label: "Property type", value: item.propertyType, icon: Building2 },
  ].filter((spec) => spec.value !== undefined);
  const secondaryDetails = [
    ["Status", item.status],
    ["Developer", item.developer],
    ["Floors", item.floors],
    ["Occupancy", item.occupancyRate !== undefined ? `${item.occupancyRate}%` : undefined],
    ["ROI", item.roi !== undefined ? `${item.roi}%` : undefined],
  ].filter((entry) => entry[1] !== undefined);

  let related: PublicProperty[] = [];
  try {
    const result = await new PropertyRepository().findAll(
      { propertyType: item.propertyType },
      1,
      5,
    );
    related = result.items.filter((property) => property.slug !== item.slug).slice(0, 3);
  } catch {
    // The primary property remains available if related listings cannot load.
  }

  return (
    <>
      <article>
        <section className="relative isolate min-h-[420px] overflow-hidden bg-primary text-white sm:min-h-[510px]">
          <Image
            src={images[0]}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/30 to-black/10" />
          <div className="mx-auto flex min-h-[420px] max-w-7xl flex-col justify-between px-6 py-8 sm:min-h-[510px]">
            <Link href="/projects" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm bg-primary/75 px-4 text-sm font-semibold hover:bg-primary">
              <ArrowLeft size={17} aria-hidden="true" /> Back to properties
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow eyebrow-on-dark">{item.propertyType} · {item.status}</p>
                <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  {item.title}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/85">
                  <MapPin size={17} aria-hidden="true" />
                  {item.location || item.city}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/75">Asking price</span>
                <p className="mt-1 text-3xl font-semibold text-secondary-light sm:text-4xl">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,0.85fr)] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Discover this property</p>
                <h2 className="mt-2 text-3xl font-semibold text-primary">Property Overview</h2>
              </div>
              {item.tag && (
                <span className="bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                  {item.tag}
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specifications.map(({ label, value, icon: Icon }) => (
                <div key={label} className="border border-border bg-card p-4">
                  <Icon size={19} className="text-secondary-ink" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-primary">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 whitespace-pre-line text-base leading-7 text-foreground/85">
              {item.description}
            </p>

            {secondaryDetails.length > 0 && (
              <dl className="mt-7 grid gap-x-8 gap-y-3 border-t border-border pt-6 sm:grid-cols-2">
                {secondaryDetails.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-5 border-b border-border py-2 text-sm">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-semibold text-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {item.features.length > 0 && (
              <section className="mt-12">
                <p className="eyebrow">What stands out</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
                  Property Features
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.features.map((feature, index) => (
                    <li key={`${feature.label}-${index}`} className="flex items-start gap-3 border border-border bg-card p-4 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-secondary-ink" aria-hidden="true" />
                      {feature.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {images.length > 1 && (
              <section className="mt-12">
                <p className="eyebrow">A closer look</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
                  Property Gallery
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {images.slice(1, 5).map((src, index) => (
                    <a
                      key={`${src}-${index}`}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open photo ${index + 2} of ${item.title}`}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`${item.title}, photo ${index + 2}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <p className="eyebrow">Explore the area</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
                The Neighborhood
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} aria-hidden="true" /> {item.location || item.city}
              </p>
              <iframe
                title={`Map of ${item.location || item.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(item.location || item.city)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-5 h-72 w-full border border-border sm:h-96"
              />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <PropertyInquiryForm propertySlug={item.slug} propertyType={item.propertyType} />
            <Link
              href={`/contact-us?property=${encodeURIComponent(item.slug)}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
            >
              View full contact page <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-muted py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Continue exploring</p>
                <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
                  More Properties
                </h2>
              </div>
              <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">
                View all properties <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((property) => (
                <Link key={property._id} href={`/projects/${property.slug}`} className="group overflow-hidden border border-border bg-card">
                  <div className="relative aspect-[1.5/1] overflow-hidden">
                    <Image
                      src={property.images[0] || "/assets/images/building.svg"}
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary">{property.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{property.location || property.city}</p>
                    <p className="mt-3 font-semibold text-secondary-ink">{formatPrice(property.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
