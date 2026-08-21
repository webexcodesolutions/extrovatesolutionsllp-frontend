import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  Compass,
  Home,
  Maximize,
  MapPin,
  Trees,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const featureIcons: Record<string, LucideIcon> = {
  beds: BedDouble,
  baths: Bath,
  area: Maximize,
  parking: Car,
  type: Building2,
  status: Check,
  possession: CalendarDays,
  view: Compass,
  eco: Trees,
  villa: Home,
  office: Building2,
  capacity: UserRound,
};

export type PropertyFeature = {
  label: string;
  icon: keyof typeof featureIcons;
};

export type PropertyCardProps = {
  id: string | number;
  slug: string;
  image: string;
  title: string;
  price: string;
  location: string;
  tag: string;
  tagVariant?: "gold" | "blue" | "red" | "green";
  features: PropertyFeature[];
  actionLabel?: string;
};

const tagStyles = {
  gold: "bg-[#e9c94a] text-[#403500]",
  blue: "bg-[#25556d] text-white",
  red: "bg-[#e94b45] text-white",
  green: "bg-[#8d9d35] text-white",
};

export function PropertyCard({
  slug,
  image,
  title,
  price,
  location,
  tag,
  tagVariant = "blue",
  features,
  actionLabel = "VIEW DETAILS",
}: PropertyCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border-[#e8e8e8] bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-[150px] overflow-hidden sm:h-[160px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        <Badge
          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide hover:opacity-100 ${tagStyles[tagVariant]}`}
        >
          {tag}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col p-4">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-[16px] font-semibold leading-5 text-[#16445f]">
            {title}
          </h3>

          <span className="shrink-0 text-[12px] font-bold text-[#806500]">
            {price}
          </span>
        </div>

        {/* Location */}
        <div className="mt-1.5 flex items-center gap-1.5 truncate text-[11px] text-[#555]">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />

          <span className="truncate">{location}</span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-[#eeeeee]" />

        {/* Features */}
        <div className="grid grid-cols-3 gap-2">
          {features.slice(0, 3).map((feature) => {
            const Icon = featureIcons[feature.icon] ?? Home;

            return (
              <div
                key={`${feature.icon}-${feature.label}`}
                className="flex min-w-0 flex-col items-center justify-center gap-1.5 text-center"
              >
                <Icon className="h-4 w-4 text-[#16445f]" strokeWidth={1.7} />

                <span className="truncate text-[10px] leading-4 text-[#444]">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href={`/projects/${slug}`}
          className="mt-4 flex h-9 w-full items-center justify-center rounded-md border border-[#16445f] bg-white text-[10px] font-semibold tracking-[0.8px] text-[#16445f] transition-colors hover:bg-[#16445f] hover:text-white"
        >
          {actionLabel}
          <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
