import { Diamond, Lightbulb, ShieldCheck, Languages } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    title: "Luxury",
    description:
      "Refining the standard of elegance in every detail and finishing.",
    icon: Diamond,
    featured: true,
  },
  {
    title: "Trust",
    description: "Building relationships on the foundation of proven results.",
    icon: ShieldCheck,
  },
  {
    title: "Transparency",
    description: "Clear communication throughout the investment lifecycle.",
    icon: Languages,
  },
  {
    title: "Innovation",
    description:
      "Leveraging cutting-edge architectural tech to redefine the future of living.",
    icon: Lightbulb,
    innovation: true,
  },
];

export function CorePrinciples() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Section Heading */}
        <div className="text-center">
          <p className="eyebrow">
            Core Principles
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            The Pillars of Our Success
          </h2>
        </div>

        {/* Principles */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-[198px_105px]">
          {principles.map((principle) => (
            <PrincipleCard key={principle.title} {...principle} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PrincipleCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  featured?: boolean;
  innovation?: boolean;
};

function PrincipleCard({
  title,
  description,
  icon: Icon,
  featured,
  innovation,
}: PrincipleCardProps) {
  if (featured) {
    return (
      <Card className="group relative overflow-hidden rounded-none border-0 bg-primary shadow-none lg:col-span-6 lg:row-span-1">
        <CardContent className="flex h-full flex-col justify-between p-6 sm:p-7">
          <Icon className="h-7 w-7 text-secondary-light" strokeWidth={1.6} />

          <div>
            <h3 className="text-[16px] font-semibold text-white">{title}</h3>

            <p className="mt-1.5 max-w-[450px] text-xs leading-[1.5] text-white/80 sm:text-sm">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (innovation) {
    return (
      <Card className="rounded-none border border-secondary/40 bg-muted shadow-none lg:col-span-6 lg:row-start-2">
        <CardContent className="flex h-full items-center gap-6 p-6 sm:px-7">
          <Icon className="h-9 w-9 shrink-0 text-foreground" strokeWidth={1.6} />

          <div>
            <h3 className="text-[16px] font-semibold text-foreground">
              {title}
            </h3>

            <p className="mt-1 max-w-[430px] text-xs leading-[1.55] text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-0 bg-muted shadow-none lg:col-span-3">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <Icon className="h-7 w-7 text-foreground" strokeWidth={1.6} />

        <div>
          <h3 className="text-[16px] font-semibold text-foreground">{title}</h3>

          <p className="mt-1.5 text-xs leading-[1.5] text-muted-foreground sm:text-sm">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
