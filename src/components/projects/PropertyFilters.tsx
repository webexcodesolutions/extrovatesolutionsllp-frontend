import Link from "next/link";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/lib/property-schema";
type Filters = { city?: string; propertyType?: string; status?: string; minPrice?: number; maxPrice?: number };
export default function PropertyFilters({ filters }: { filters: Filters }) {
  return <form action="/projects" method="get" className="mx-auto grid max-w-7xl gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Filter properties">
    <label className="grid gap-2 text-sm">Location<input name="city" defaultValue={filters.city} maxLength={100} placeholder="All locations" className="h-11 rounded-md border bg-background px-3" /></label>
    <label className="grid gap-2 text-sm">Property type<select name="propertyType" defaultValue={filters.propertyType || ""} className="h-11 rounded-md border bg-background px-3"><option value="">All types</option>{PROPERTY_TYPES.map(value => <option key={value}>{value}</option>)}</select></label>
    <label className="grid gap-2 text-sm">Status<select name="status" defaultValue={filters.status || ""} className="h-11 rounded-md border bg-background px-3"><option value="">All statuses</option>{PROPERTY_STATUSES.map(value => <option key={value}>{value}</option>)}</select></label>
    <label className="grid gap-2 text-sm">Minimum budget (INR)<input name="minPrice" type="number" min="0" step="any" defaultValue={filters.minPrice} placeholder="Any minimum" className="h-11 rounded-md border bg-background px-3" /></label>
    <label className="grid gap-2 text-sm">Maximum budget (INR)<input name="maxPrice" type="number" min="0" step="any" defaultValue={filters.maxPrice} placeholder="Any maximum" className="h-11 rounded-md border bg-background px-3" /></label>
    <div className="flex items-end gap-5"><button className="h-11 rounded-md bg-primary px-6 text-primary-foreground" type="submit">Search properties</button><Link className="flex min-h-11 items-center underline" href="/projects">Reset</Link></div>
  </form>;
}
