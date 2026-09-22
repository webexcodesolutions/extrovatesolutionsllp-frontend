"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import PropertyFilters from "@/components/projects/PropertyFilters";
import { PropertyCard, type PropertyCardProps } from "@/components/projects/Property-card";

type ApiProperty = { _id: string; slug: string; title: string; price: number; formattedPrice?: string; city: string; location?: string; tag?: string; propertyType: string; status: string; images?: string[]; features?: PropertyCardProps["features"] };
type ApiResponse = { items: ApiProperty[]; page: number; total: number; totalPages: number; error?: string };
const initialFilters = { city: "", propertyType: "", status: "", minPrice: "", maxPrice: "" };

export default function ProjectsListing() {
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (page: number, activeFilters = appliedFilters) => {
    setLoading(true); setError("");
    const query = new URLSearchParams({ page: String(page), limit: "9" });
    Object.entries(activeFilters).forEach(([key, value]) => { if (value) query.set(key, value); });
    try {
      const response = await fetch(`/api/properties?${query}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to load properties");
      setData(payload);
    } catch (err) { setData(null); setError(err instanceof Error ? err.message : "Unable to load properties"); }
    finally { setLoading(false); }
  }, [appliedFilters]);

  // Initial request is intentionally started after mount so this client component can use the configured API.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(1); }, [load]);
  const applyFilters = () => { setAppliedFilters(filters); load(1, filters); };

  return <>
    <PropertyFilters filters={filters} onChange={setFilters} onSubmit={applyFilters} onReset={() => { setFilters(initialFilters); setAppliedFilters(initialFilters); load(1, initialFilters); }} />
    <section className="bg-[#faf9f8]">
      <div className="mx-auto max-w-[1280px] px-5 py-10">
        {loading && <div className="flex min-h-72 items-center justify-center text-[#164b66]"><LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Loading properties…</div>}
        {!loading && error && <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error}. Configure `MONGODB_URI` in `.env.local` to load the property portfolio.</div>}
        {!loading && !error && data?.items.length === 0 && <div className="rounded-lg border border-[#e5e5e5] bg-white p-10 text-center text-sm text-[#555]">No properties match these filters.</div>}
        {!loading && !error && data && <>
          <p className="mb-5 text-sm text-[#555]">{data.total} {data.total === 1 ? "property" : "properties"} found</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((property) => <PropertyCard key={property._id} id={property._id} slug={property.slug} image={property.images?.[0] || "/assets/images/building.svg"} title={property.title} price={property.formattedPrice || new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(property.price)} location={property.location || property.city} tag={property.tag || property.status} features={property.features || []} />)}
          </div>
          {data.totalPages > 1 && <nav aria-label="Property pages" className="mt-10 flex items-center justify-center gap-3">
            <PaginationButton disabled={data.page === 1} onClick={() => load(data.page - 1)}><ChevronLeft className="h-4 w-4" /> Previous</PaginationButton>
            <span className="text-sm text-[#555]">Page {data.page} of {data.totalPages}</span>
            <PaginationButton disabled={data.page === data.totalPages} onClick={() => load(data.page + 1)}>Next <ChevronRight className="h-4 w-4" /></PaginationButton>
          </nav>}
        </>}
      </div>
    </section>
  </>;
}

function PaginationButton({ children, disabled, onClick }: { children: React.ReactNode; disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="inline-flex items-center gap-1 rounded-md border border-[#164b66] px-3 py-2 text-xs font-semibold text-[#164b66] disabled:cursor-not-allowed disabled:opacity-40">{children}</button>;
}
