"use client";

import { Search } from "lucide-react";

type Filters = { city: string; propertyType: string; status: string; minPrice: string; maxPrice: string };

export default function PropertyFilters({ filters, onChange, onSubmit, onReset }: { filters: Filters; onChange: (filters: Filters) => void; onSubmit: () => void; onReset: () => void }) {
  return (
    <section className="w-full bg-[#faf9f8] px-1 py-1.5 sm:px-2">
      <div className="mx-auto w-full max-w-[1280px] rounded-[8px] border border-[#e7e7e7] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
          {/* Location */}
          <FilterField label="Location" value={filters.city} onChange={(city) => onChange({ ...filters, city })} placeholder="All locations" className="lg:flex-[1.1]" />

          {/* Property Type */}
          <SelectField label="Property Type" value={filters.propertyType} onChange={(propertyType) => onChange({ ...filters, propertyType })} options={["Residential", "Commercial", "Villa", "Apartment", "Office", "Land"]} className="lg:flex-[1.1]" />

          {/* Budget */}
          <FilterField label="Minimum Budget" value={filters.minPrice} onChange={(minPrice) => onChange({ ...filters, minPrice })} placeholder="Any minimum" type="number" className="lg:flex-1" />
          <FilterField label="Maximum Budget" value={filters.maxPrice} onChange={(maxPrice) => onChange({ ...filters, maxPrice })} placeholder="Any maximum" type="number" className="lg:flex-1" />

          {/* Status */}
          <FilterField label="Status" value={filters.status} onChange={(status) => onChange({ ...filters, status })} placeholder="All statuses" className="lg:flex-[0.75]" />

          {/* Filter Button */}
          <button
            type="button" onClick={onSubmit}
            className="flex h-[28px] shrink-0 items-center justify-center gap-1.5 rounded-[5px] bg-[#806500] px-4 text-[9px] font-semibold uppercase tracking-[0.3px] text-white transition-colors hover:bg-[#6d5700] focus:outline-none focus:ring-2 focus:ring-[#806500]/30 focus:ring-offset-1 lg:w-[78px]"
          >
            <Search className="h-3 w-3" strokeWidth={2.5} />
            Filter
          </button>
          <button type="button" onClick={onReset} className="text-xs text-[#555] underline">Reset</button>
        </div>
      </div>
    </section>
  );
}

type FilterFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
  className?: string;
};

function FilterField({ label, value, onChange, placeholder, type = "text", className = "" }: FilterFieldProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label className="mb-1 block text-[9px] font-medium leading-none tracking-[0.2px] text-[#333840]">
        {label}
      </label>

      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-[28px] w-full rounded-[5px] border border-[#d5d9dd] px-2 text-[10px]" />
    </div>
  );
}

function SelectField({ label, value, onChange, options, className }: { label: string; value: string; onChange: (value: string) => void; options: string[]; className: string }) {
  return <div className={`min-w-0 ${className}`}><label className="mb-1 block text-[9px] font-medium text-[#333840]">{label}</label><select value={value} onChange={(event) => onChange(event.target.value)} className="h-[28px] w-full rounded-[5px] border border-[#d5d9dd] bg-white px-2 text-[10px]"><option value="">All types</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}
