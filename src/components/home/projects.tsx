import Link from "next/link";
import { Bath, BedDouble, Maximize, ArrowUpRight } from "lucide-react";
import { PropertyCard } from "@/components/shared/Property-card";

export const projects = [
  {
    id: 1,
    title: "The Grand Residence",
    price: "$2.4M",
    tag: "Luxury",
    image: "/images/property-1.jpg",
    description:
      "An exceptional residence combining contemporary architecture with refined interiors and premium amenities.",
    features: [
      {
        label: "4 Beds",
        icon: "BedDouble",
      },
      {
        label: "3 Baths",
        icon: "Bath",
      },
      {
        label: "2,450 sq ft",
        icon: "Maximize",
      },
    ],
  },

  {
    id: 2,
    title: "Azure Heights",
    price: "$1.8M",
    tag: "New Launch",
    image: "/images/property-2.jpg",
    description:
      "Modern apartments designed for sophisticated urban living with panoramic city views.",
    features: [
      {
        label: "3 Beds",
        icon: "BedDouble",
      },
      {
        label: "2 Baths",
        icon: "Bath",
      },
      {
        label: "1,850 sq ft",
        icon: "Maximize",
      },
    ],
  },

  {
    id: 3,
    title: "The Metropolitan",
    price: "$950K",
    tag: "Featured",
    image: "/images/property-3.jpg",
    description:
      "A thoughtfully designed urban property offering contemporary comfort in a prime location.",
    features: [
      {
        label: "2 Beds",
        icon: "BedDouble",
      },
      {
        label: "2 Baths",
        icon: "Bath",
      },
      {
        label: "1,240 sq ft",
        icon: "Maximize",
      },
    ],
  },
];

export default function Projects() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-secondary">
              CURATED SELECTION
            </p>

            <h2 className="font-montserrat text-4xl font-bold text-foreground md:text-5xl">
              Architectural Masterpieces
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Exploring the intersection of avant-garde design and sustainable
              structural engineering. Each property in our portfolio represents
              a pinnacle of luxury and investment viability.
            </p>
          </div>

          <Link
            href="/projects"
            className="flex items-center gap-2 font-montserrat font-semibold text-secondary transition hover:gap-3"
          >
            View All Projects
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PropertyCard
              key={project.id}
              image={project.image}
              title={project.title}
              price={project.price}
              tag={project.tag}
              description={project.description}
              features={project.features}
              href={`/properties/${project.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
