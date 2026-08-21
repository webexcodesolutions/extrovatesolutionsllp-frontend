import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { projects } from "../page";

type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;

  const project = projects.find((project) => project.slug === slug);

  console.log(">>>", projects, slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#faf9f8]">
      {/* Hero */}
      <section className="bg-[#164b66]">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[11px] font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#c5a021]">
              {project.category}
            </p>

            <h1 className="mt-2 text-[36px] font-bold tracking-[-1px] text-white sm:text-[46px]">
              {project.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-[13px] text-white/80">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Information */}
          <div>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#c5a021]">
                  Starting From
                </p>

                <p className="mt-1 text-[28px] font-bold text-[#164b66]">
                  {project.price}
                </p>
              </div>

              <span className="rounded-md bg-[#e9c94a] px-3 py-1.5 text-[9px] font-semibold uppercase text-[#403500]">
                {project.tag}
              </span>
            </div>

            <div className="mt-7 border-t border-[#e5e5e5] pt-7">
              <h2 className="text-[20px] font-semibold text-[#164b66]">
                Property Overview
              </h2>

              <p className="mt-4 text-[13px] leading-7 text-[#555]">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {project.features.map((feature) => (
                <div
                  key={`${feature.icon}-${feature.label}`}
                  className="rounded-lg border border-[#e5e5e5] bg-white p-4 text-center"
                >
                  <p className="text-[11px] font-medium text-[#444]">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional information */}
            <div className="mt-7 space-y-3 border-t border-[#e5e5e5] pt-6">
              {project.status && (
                <div className="flex justify-between gap-5 text-[12px]">
                  <span className="text-[#777]">Status</span>

                  <span className="font-medium text-[#164b66]">
                    {project.status}
                  </span>
                </div>
              )}

              {project.developer && (
                <div className="flex justify-between gap-5 text-[12px]">
                  <span className="text-[#777]">Developer</span>

                  <span className="font-medium text-[#164b66]">
                    {project.developer}
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-8 flex h-11 w-full items-center justify-center rounded-md bg-[#c5a021] text-[10px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#ad8b16]"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
