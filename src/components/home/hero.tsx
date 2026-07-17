import Image from "next/image";
import { MapPin, Building2, BadgeDollarSign, Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cities = [
  {
    label: "Mumbai",
    value: "mumbai",
  },
  {
    label: "Delhi",
    value: "delhi",
  },
  {
    label: "Bangalore",
    value: "bangalore",
  },
];

const propertyTypes = [
  {
    label: "Commercial Estate",
    value: "commercial",
  },
  {
    label: "Villa",
    value: "villa",
  },
  {
    label: "Apartment",
    value: "apartment",
  },
];

const budgets = [
  {
    label: "$1M - $5M",
    value: "1-5",
  },
  {
    label: "$5M - $10M",
    value: "5-10",
  },
  {
    label: "$10M+",
    value: "10+",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero.svg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 py-24 lg:min-h-[85vh]">
          <div className="max-w-3xl">
            {/* Subtitle */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-secondary">
              PREMIER REAL ESTATE INVESTMENTS
            </p>

            {/* Heading */}
            <h1 className="font-montserrat text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Redefining the
              <br />
              <span className="text-secondary">Architecture</span> of
              <br />
              Investment
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Experience a paradigm shift in property acquisition. We blend
              structural precision with financial mastery to secure your legacy.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-md bg-secondary px-8 py-4 font-montserrat font-semibold text-secondary-foreground transition-all duration-300 hover:-translate-y-1 hover:opacity-90">
                Explore Portfolio →
              </button>

              <button className="rounded-md border border-primary-foreground/30 bg-background/10 px-8 py-4 font-montserrat font-semibold text-primary-foreground backdrop-blur-md transition-all duration-300 hover:bg-background/20">
                Watch Film
              </button>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-6 pb-12">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Location */}
              <div className="flex flex-col">
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  Location
                </label>

                <Select>
                  <SelectTrigger className="h-12 border-border bg-background w-auto min-w-37.5">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="flex flex-col">
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 size={16} />
                  Property Type
                </label>

                <Select>
                  <SelectTrigger className="h-12 border-border bg-background w-auto min-w-37.5">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="flex flex-col">
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeDollarSign size={16} />
                  Budget Range
                </label>

                <Select>
                  <SelectTrigger className="h-12 border-border bg-background  w-auto min-w-37.5">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    {budgets.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="flex items-end">
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-montserrat font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:opacity-90">
                  <Search size={18} />
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
