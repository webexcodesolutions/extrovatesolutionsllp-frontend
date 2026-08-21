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
    <section className="bg-[#faf9f7]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        {/* Section Heading */}
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#c5a021]">
            Core Principles
          </p>

          <h2 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.5px] text-[#164b66] sm:text-[32px]">
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
      <Card className="group relative overflow-hidden rounded-none border-0 bg-[#164b66] shadow-none lg:col-span-6 lg:row-span-1">
        <CardContent className="flex h-full flex-col justify-between p-6 sm:p-7">
          <Icon className="h-7 w-7 text-[#f2cc4c]" strokeWidth={1.6} />

          <div>
            <h3 className="text-[16px] font-semibold text-white">{title}</h3>

            <p className="mt-1.5 max-w-[450px] text-[10px] leading-[1.5] text-[#a9cce5] sm:text-[11px]">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (innovation) {
    return (
      <Card className="rounded-none border border-[#e5c45b] bg-[#fff5d9] shadow-none lg:col-span-6 lg:row-start-2">
        <CardContent className="flex h-full items-center gap-6 p-6 sm:px-7">
          <Icon className="h-9 w-9 shrink-0 text-[#202020]" strokeWidth={1.6} />

          <div>
            <h3 className="text-[16px] font-semibold text-[#164b66]">
              {title}
            </h3>

            <p className="mt-1 max-w-[430px] text-[10px] leading-[1.55] text-[#555] sm:text-[11px]">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-0 bg-[#e9e7e7] shadow-none lg:col-span-3">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <Icon className="h-7 w-7 text-[#164b66]" strokeWidth={1.6} />

        <div>
          <h3 className="text-[16px] font-semibold text-[#164b66]">{title}</h3>

          <p className="mt-1.5 text-[10px] leading-[1.5] text-[#555] sm:text-[11px]">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
