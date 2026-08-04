import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Ruler,
  Building2,
  Users,
  TrendingUp,
  Waves,
  Eye,
  Shield,
  ArrowUpRight,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Meridian Atrium",
    price: "$4.2M",
    tag: "NEW CONSTRUCTION",
    image: "/projects/sample1.svg",
    description:
      "A masterclass in transparency and light, featuring a 40-foot central atrium and sustainable architecture.",
    features: ["5 Beds", "6 Baths", "6,500 SF"],
    icons: [Bed, Bath, Ruler],
  },
  {
    id: 2,
    title: "Aura Tower C",
    price: "$18.5M",
    tag: "INVESTMENT OPPORTUNITY",
    image: "/projects/sample2.svg",
    description:
      "Prime commercial real estate in the heart of the financial district with 98% occupancy rate.",
    features: ["24 Floors", "Leased", "7.2% ROI"],
    icons: [Building2, Users, TrendingUp],
  },
  {
    id: 3,
    title: "Solstice Estate",
    price: "$9.8M",
    tag: "UNDER CONSTRUCTION",
    image: "/projects/sample3.svg",
    description:
      "An architectural marvel carved into the coastal cliffs, offering panoramic vistas and privacy.",
    features: ["Pool", "Ocean View", "Gated"],
    icons: [Waves, Eye, Shield],
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
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Tag */}
                <span className="absolute left-4 top-4 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground">
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-montserrat text-2xl font-bold text-foreground">
                    {project.title}
                  </h3>

                  <span className="shrink-0 text-xl font-bold text-secondary">
                    {project.price}
                  </span>
                </div>

                <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {project.features.map((feature, index) => {
                    const Icon = project.icons[index];

                    return (
                      <div key={feature} className="flex items-center gap-2">
                        <Icon size={16} className="text-secondary" />

                        {feature}
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <button className="mt-8 rounded-md border border-primary py-3 font-montserrat font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
