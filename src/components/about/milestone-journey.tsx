import Image from "next/image";
import { Card } from "@/components/ui/card";

const milestones: Array<{
  year: string;
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
}> = [
  {
    year: "2010",
    title: "The Inception",
    description:
      "Extrovate Solutions LLP founded in London with a focus on luxury residential advisory.",
    image: "/assets/images/the-inception.svg",
    side: "left",
  },
  {
    year: "2015",
    title: "Global Expansion",
    description:
      "Established strategic hubs in Dubai and Singapore, managing over $5B in assets.",
    image: "/assets/images/global-expansion.svg",
    side: "right",
  },
  {
    year: "2023",
    title: "Sustainable Future",
    description:
      "Launched the 'Green Legacy' initiative, committing to 100% carbon-neutral developments.",
    image: "/assets/images/sustainable-future.svg",
    side: "left",
  },
];

export function MilestoneJourney() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        {/* Heading */}
        <h2 className="text-center text-[28px] font-semibold tracking-[-0.5px] text-[#164b66] sm:text-[32px]">
          Our Milestone Journey
        </h2>

        {/* Timeline */}
        <div className="relative mx-auto mt-12 max-w-[1050px]">
          {/* Center Line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#d8dde0] md:block" />

          <div className="space-y-14 md:space-y-0">
            {milestones.map((milestone, index) => (
              <Milestone key={milestone.year} {...milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type MilestoneProps = {
  year: string;
  title: string;
  description: string;
  image: string;
  side: "left" | "right";
  index: number;
};

function Milestone({
  year,
  title,
  description,
  image,
  side,
  index,
}: MilestoneProps) {
  const isLeft = side === "left";

  return (
    <div className="relative md:min-h-[175px]">
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-1/2 z-20 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c29c1e] md:block" />

      {/* Mobile timeline */}
      <div className="absolute bottom-0 left-3 top-0 w-px bg-[#d8dde0] md:hidden" />

      <div
        className={`grid md:grid-cols-2 ${
          isLeft ? "" : "md:[&>*:first-child]:order-2"
        }`}
      >
        {/* Text */}
        <div
          className={`relative flex items-center px-8 py-2 md:px-10 ${
            isLeft
              ? "md:justify-end md:text-right"
              : "md:justify-start md:text-left"
          }`}
        >
          {/* Mobile dot */}
          <span className="absolute left-[9px] top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#c29c1e] md:hidden" />

          <div className="max-w-[360px]">
            <div className="text-[42px] font-bold leading-none tracking-[-1.5px] text-[#e8edf0] sm:text-[48px]">
              {year}
            </div>

            <h3 className="mt-[-3px] text-[15px] font-semibold text-[#164b66] sm:text-[16px]">
              {title}
            </h3>

            <p className="mt-2 text-[10px] leading-[1.55] text-[#555] sm:text-[11px]">
              {description}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="px-8 md:px-10">
          <Card className="overflow-hidden rounded-none border-0 p-0 shadow-none">
            <div className="relative aspect-[2.35/1] overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
