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
    <section className="bg-[#F8F8F8] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#C6A128]">
              CURATED SELECTION
            </p>

            <h2 className="text-4xl font-bold text-[#123A54] md:text-5xl">
              Architectural Masterpieces
            </h2>

            <p className="mt-4 max-w-3xl text-gray-600">
              Exploring the intersection of avant-garde design and sustainable
              structural engineering. Each property in our portfolio represents
              a pinnacle of luxury and investment viability.
            </p>
          </div>

          <Link
            href="/projects"
            className="flex items-center gap-2 font-semibold text-[#B89A27] hover:underline"
          >
            View All Projects
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#E8C547] px-4 py-1 text-xs font-semibold text-[#123A54]">
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-semibold text-[#123A54]">
                    {project.title}
                  </h3>

                  <span className="text-2xl font-bold text-[#B89A27]">
                    {project.price}
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-gray-600">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                  {project.features.map((feature, index) => {
                    const Icon = project.icons[index];

                    return (
                      <div key={feature} className="flex items-center gap-1">
                        <Icon size={16} />
                        {feature}
                      </div>
                    );
                  })}
                </div>

                {/* Button */}
                <button className="mt-8 w-full border border-[#123A54] py-3 font-semibold text-[#123A54] transition hover:bg-[#123A54] hover:text-white">
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
