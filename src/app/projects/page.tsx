import CuratedPortfolioIntro from "@/components/projects/CuratedPortfolioIntro";
import PropertyFilters from "@/components/projects/PropertyFilters";
import { PropertyCard } from "@/components/projects/Property-card";

import type { PropertyCardProps } from "@/components/projects/Property-card";

export type Project = PropertyCardProps & {
  slug: string;
  category: string;
  description: string;
  status?: string;
  developer?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "zenith-atrium",
    image: "/assets/images/zenith-atrium.svg",
    title: "The Zenith Atrium",
    price: "₹4.2 Cr+",
    location: "Worli, Mumbai South",
    tag: "NEW LAUNCH",
    tagVariant: "gold",

    category: "Residential",
    status: "Under Construction",
    developer: "Extrovate Solutions LLP",

    description:
      "The Zenith Atrium is a landmark residential development in Worli, Mumbai South, designed around refined architecture, premium amenities, and exceptional urban living.",

    features: [
      {
        label: "3 & 4 BHK",
        icon: "beds",
      },
      {
        label: "2,450 Sq.Ft",
        icon: "area",
      },
      {
        label: "Dec 2026",
        icon: "possession",
      },
    ],

    actionLabel: "VIEW DETAILS",
  },

  {
    id: 2,
    slug: "meridian-square",
    image: "/assets/images/meridian-square.svg",
    title: "Meridian Square",
    price: "₹12 Cr+",
    location: "BKC, Mumbai",
    tag: "READY TO MOVE",
    tagVariant: "blue",

    category: "Commercial",
    status: "Ready to Move",
    developer: "Extrovate Solutions LLP",

    description:
      "Meridian Square offers premium commercial offices in Mumbai's BKC business district, combining strategic location, modern infrastructure, and flexible business environments.",

    features: [
      {
        label: "Premium Office",
        icon: "office",
      },
      {
        label: "400+ Cap.",
        icon: "capacity",
      },
      {
        label: "Leased",
        icon: "status",
      },
    ],

    actionLabel: "EXPLORE OFFICES",
  },

  {
    id: 3,
    slug: "amber-residences",
    image: "/assets/images/amber-residences.svg",
    title: "Amber Residences",
    price: "₹8.5 Cr",
    location: "Koregaon Park, Pune",
    tag: "HOT DEAL",
    tagVariant: "red",

    category: "Residential",
    status: "Ready to Move",
    developer: "Extrovate Solutions LLP",

    description:
      "Amber Residences is an exclusive luxury development in Koregaon Park featuring spacious residences, private amenities, landscaped surroundings, and refined contemporary architecture.",

    features: [
      {
        label: "Private Pool",
        icon: "bath",
      },
      {
        label: "4 Parking",
        icon: "parking",
      },
      {
        label: "5 BHK Villa",
        icon: "villa",
      },
    ],

    actionLabel: "CONTACT AGENT",
  },

  {
    id: 4,
    slug: "indigo-heights",
    image: "/assets/images/indigo-heights.svg",
    title: "Indigo Heights",
    price: "₹2.8 Cr+",
    location: "Whitefield, Bengaluru",
    tag: "UNDER CONSTRUCTION",
    tagVariant: "blue",

    category: "Residential",
    status: "Under Construction",
    developer: "Extrovate Solutions LLP",

    description:
      "Indigo Heights brings contemporary residential living to Whitefield with thoughtfully designed homes, wellness amenities, landscaped spaces, and sustainable planning.",

    features: [
      {
        label: "70% Done",
        icon: "status",
      },
      {
        label: "Elite Gym",
        icon: "home",
      },
      {
        label: "Eco Park",
        icon: "eco",
      },
    ],

    actionLabel: "CHECK PROGRESS",
  },

  {
    id: 5,
    slug: "opal-highstreet",
    image: "/assets/images/opal-highstreet.svg",
    title: "Opal Highstreet",
    price: "₹1.5 Cr",
    location: "Baner Road, Pune",
    tag: "RETAIL",
    tagVariant: "gold",

    category: "Commercial",
    status: "Ready to Move",
    developer: "Extrovate Solutions LLP",

    description:
      "Opal Highstreet is a modern retail destination on Baner Road, Pune, offering strategically positioned commercial spaces designed for high visibility and accessibility.",

    features: [
      {
        label: "600 Sq.Ft",
        icon: "area",
      },
      {
        label: "Near Parking",
        icon: "parking",
      },
      {
        label: "Smart Hub",
        icon: "office",
      },
    ],

    actionLabel: "ENQUIRE SHOP",
  },

  {
    id: 6,
    slug: "emerald-grove",
    image: "/assets/images/emerald-grove.svg",
    title: "Emerald Grove",
    price: "₹15 Cr",
    location: "Electronic City, Bengaluru",
    tag: "LIMITED EDITION",
    tagVariant: "green",

    category: "Residential",
    status: "Limited Edition",
    developer: "Extrovate Solutions LLP",

    description:
      "Emerald Grove is a limited-edition luxury development surrounded by nature, offering bespoke residences, private amenities, and an environmentally conscious approach to modern living.",

    features: [
      {
        label: "Eco-Friendly",
        icon: "eco",
      },
      {
        label: "5-Tier Sec.",
        icon: "status",
      },
      {
        label: "Bespoke Pool",
        icon: "bath",
      },
    ],

    actionLabel: "BOOK TOUR",
  },
];

function Projects() {
  return (
    <div>
      <CuratedPortfolioIntro />

      <PropertyFilters />

      <section className="bg-[#faf9f8]">
        <div className="mx-auto max-w-[1280px] px-5 py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <PropertyCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
