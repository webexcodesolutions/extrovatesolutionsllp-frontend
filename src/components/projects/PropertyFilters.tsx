import { Building2, MapPin, Search, Wallet } from "lucide-react";
import { PROPERTY_STATUSES, PROPERTY_TYPES } from "@/lib/property-schema";

import { budgetOptions } from "@/lib/budgets";

type Filters = { city?: string; propertyType?: string; status?: string; minPrice?: number; maxPrice?: number };

export default function PropertyFilters({ filters, variant = "listing", budget = "" }: { filters: Filters; variant?: "hero" | "listing"; budget?: string }) {
  const hero = variant === "hero";
  const field = "mt-2 h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  return <form action="/projects" method="get" role="search" aria-label="Search properties" className={hero ? "grid gap-4 bg-card px-5 py-6 shadow-lg shadow-primary/10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5 lg:px-8" : "grid gap-4 rounded-sm border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end lg:p-6"}>
    <label className="block min-w-0 text-xs font-medium text-foreground"><span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" /> Location</span><input name="city" list="search-cities" defaultValue={filters.city || ""} maxLength={100} placeholder="Select city" className={field} autoComplete="address-level2" /><datalist id="search-cities"><option value="Mumbai" /><option value="Delhi" /><option value="Bengaluru" /><option value="Pune" /><option value="Dubai" /></datalist></label>
    <label className="block min-w-0 text-xs font-medium text-foreground"><span className="flex items-center gap-2"><Building2 size={14} aria-hidden="true" /> Property type</span><select name="propertyType" defaultValue={filters.propertyType || ""} className={field}><option value="">All property types</option>{PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></label>
    <label className="block min-w-0 text-xs font-medium text-foreground"><span className="flex items-center gap-2"><Wallet size={14} aria-hidden="true" /> Budget range</span><select name="budget" defaultValue={budget} className={field}><option value="">Any budget</option>{budgetOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
    {!hero && <label className="block min-w-0 text-xs font-medium text-foreground"><span>Status</span><select name="status" defaultValue={filters.status || ""} className={field}><option value="">All statuses</option>{PROPERTY_STATUSES.map(status => <option key={status}>{status}</option>)}</select></label>}
    <button className="flex h-12 min-w-44 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring" type="submit"><Search size={17} aria-hidden="true" /> Search properties</button>
  </form>;
}
