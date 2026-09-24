import type { Metadata } from "next";
import Link from "next/link";
import CuratedPortfolioIntro from "@/components/projects/CuratedPortfolioIntro";
import ProjectsListing from "@/components/projects/ProjectsListing";
import PropertyFilters from "@/components/projects/PropertyFilters";
import { propertyQuerySchema } from "@/lib/property-schema";
import { PropertyRepository } from "@/repositories/property.repository";
import { connectDB } from "@/db/mongodb";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Properties",
  description: "Explore available properties by location, type and budget.",
  alternates: { canonical: "/projects" },
};
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = Object.fromEntries(
    Object.entries(await searchParams).filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === "string" && entry[1] !== "",
    ),
  );
  const parsed = propertyQuerySchema.safeParse(query);
  if (!parsed.success)
    return (
      <>
        <CuratedPortfolioIntro />
        <PropertyFilters filters={{}} />
        <p role="alert" className="mx-auto max-w-7xl p-6">
          Check your filters: budgets must be nonnegative, minimum cannot exceed
          maximum, and the page must be a positive whole number.
        </p>
      </>
    );
  const { page, limit, ...filters } = parsed.data;
  let data;
  try {
    await connectDB();
    data = await new PropertyRepository().findAll(filters, page, limit);
  } catch {
    console.error(JSON.stringify({ event: "portfolio_unavailable" }));
  }
  return (
    <>
      <CuratedPortfolioIntro />
      <PropertyFilters filters={filters} />
      {data ? (
        <ProjectsListing data={data} query={query} />
      ) : (
        <div role="alert" className="mx-auto max-w-7xl p-10">
          <p>
            Properties are temporarily unavailable. Please try again shortly.
          </p>
          <Link
            className="mt-4 inline-flex min-h-11 items-center underline"
            href={`/projects?${new URLSearchParams(query)}`}
          >
            Try again
          </Link>
        </div>
      )}
    </>
  );
}
