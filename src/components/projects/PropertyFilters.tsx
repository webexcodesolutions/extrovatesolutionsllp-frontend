"use client";

import { Building2, ChevronDown, MapPin, Search } from "lucide-react";

const filters = [
  {
    label: "Location",
    value: "All Locations",
    icon: MapPin,
  },
  {
    label: "Property Type",
    value: "All Types",
    icon: Building2,
  },
  {
    label: "Budget Range",
    value: "Any Budget",
    icon: null,
  },
  {
    label: "Status",
    value: "All Status",
    icon: null,
  },
];

export default function PropertyFilters() {
  return (
    <section className="w-full bg-[#faf9f8] px-1 py-1.5 sm:px-2">
      <div className="mx-auto w-full max-w-[1280px] rounded-[8px] border border-[#e7e7e7] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
          {/* Location */}
          <FilterField
            label="Location"
            value="All Locations"
            icon={<MapPin className="h-3.5 w-3.5 text-[#626b73]" />}
            className="lg:flex-[1.1]"
          />

          {/* Property Type */}
          <FilterField
            label="Property Type"
            value="All Types"
            icon={<Building2 className="h-3.5 w-3.5 text-[#626b73]" />}
            className="lg:flex-[1.1]"
          />

          {/* Budget */}
          <FilterField
            label="Budget Range"
            value="Any Budget"
            className="lg:flex-[1.1]"
          />

          {/* Status */}
          <FilterField
            label="Status"
            value="All Status"
            className="lg:flex-[0.75]"
          />

          {/* Filter Button */}
          <button
            type="button"
            className="flex h-[28px] shrink-0 items-center justify-center gap-1.5 rounded-[5px] bg-[#806500] px-4 text-[9px] font-semibold uppercase tracking-[0.3px] text-white transition-colors hover:bg-[#6d5700] focus:outline-none focus:ring-2 focus:ring-[#806500]/30 focus:ring-offset-1 lg:w-[78px]"
          >
            <Search className="h-3 w-3" strokeWidth={2.5} />
            Filter
          </button>
        </div>
      </div>
    </section>
  );
}

type FilterFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
};

function FilterField({ label, value, icon, className = "" }: FilterFieldProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label className="mb-1 block text-[9px] font-medium leading-none tracking-[0.2px] text-[#333840]">
        {label}
      </label>

      <button
        type="button"
        className="flex h-[28px] w-full items-center rounded-[5px] border border-[#d5d9dd] bg-white px-2 text-left text-[10px] text-[#444a50] transition-colors hover:border-[#b9bec4] focus:border-[#806500] focus:outline-none focus:ring-1 focus:ring-[#806500]/20"
      >
        {icon && <span className="mr-1.5 shrink-0">{icon}</span>}

        <span className="min-w-0 flex-1 truncate">{value}</span>

        <ChevronDown className="ml-2 h-3 w-3 shrink-0 text-[#66717b]" />
      </button>
    </div>
  );
}
