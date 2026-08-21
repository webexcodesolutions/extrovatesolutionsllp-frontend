import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, Maximize, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featureIcons: Record<string, LucideIcon> = {
  bed: BedDouble,
  bath: Bath,
  size: Maximize,
};

export type PropertyFeature = {
  label: string;
  icon: keyof typeof featureIcons;
};

export type PropertyCardProps = {
  image: string;
  title: string;
  price: string;
  description: string;
  tag?: string;
  features?: PropertyFeature[];
  href?: string;
};

export function PropertyCard({
  image,
  title,
  price,
  description,
  tag,
  features = [],
  href = "#",
}: PropertyCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-[280px] shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

        {tag && (
          <Badge className="absolute left-4 top-4 rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-secondary-foreground hover:bg-secondary">
            {tag}
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col p-6">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-montserrat text-2xl font-bold leading-tight text-foreground">
            {title}
          </h3>

          <span className="shrink-0 text-xl font-bold text-secondary">
            {price}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 flex-1 leading-7 text-muted-foreground">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 text-sm text-muted-foreground">
            {features.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? Home;

              return (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-secondary"
                  />

                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <Button
          variant="outline"
          className="mt-8 h-11 w-full rounded-md border-primary font-montserrat font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <Link href={href}>
            View Details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
