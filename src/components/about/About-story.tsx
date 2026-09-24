import Image from "next/image";
import { Building2, Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function AboutStory() {
  return (
    <>
      {/* Our Narrative */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:gap-16">
            {/* Image */}
            <div className="relative border border-[#d9d9d9] p-2">
              <div className="relative aspect-[1.35/1] overflow-hidden">
                <Image
                  src="/assets/images/modern-building.svg"
                  alt="Modern architectural building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[2px] text-secondary">
                Our Narrative
              </p>

              <h2 className="mt-3 max-w-[520px] text-[30px] font-semibold leading-[1.12] tracking-[-0.7px] text-foreground sm:text-[34px]">
                A Journey Rooted in
                <br className="hidden sm:block" />
                Architectural Precision
              </h2>

              <div className="mt-5 max-w-[570px] space-y-4 text-sm leading-[1.65] text-muted-foreground sm:text-[12px]">
                <p>
                  We help people explore residential and commercial properties,
                  understand their options, and plan the next steps in their search.
                </p>

                <p>
                  Our approach starts with your requirements: location, budget,
                  intended use and timing. Contact our team to discuss how we can help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-muted">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            <AboutValueCard icon={Building2} title="Our Mission">
              To provide sophisticated real estate solutions that maximize value
              and enhance living standards through innovative design and
              disciplined investment strategies, ensuring every client
              experiences the pinnacle of professional service.
            </AboutValueCard>

            <AboutValueCard icon={Eye} title="Our Vision">
              To be the global benchmark for excellence in real estate
              development and consultancy, recognized for transforming skylines
              and creating sustainable, luxury environments that stand the test
              of time.
            </AboutValueCard>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutValueCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-none border-0 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <CardContent className="p-7 sm:p-8 lg:p-9">
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center bg-muted">
          <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="mt-5 text-[17px] font-semibold text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 max-w-[520px] text-sm leading-[1.7] text-muted-foreground sm:text-[12px]">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}
