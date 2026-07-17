import Image from "next/image";
import {
  ChevronDown,
  MapPin,
  Building2,
  BadgeDollarSign,
  Search,
} from "lucide-react";

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

        {/* Theme Overlay */}
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24">
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

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-md bg-secondary px-8 py-4 font-montserrat font-semibold text-secondary-foreground transition-all duration-300 hover:opacity-90">
                Explore Portfolio →
              </button>

              <button className="rounded-md border border-primary-foreground/30 bg-background/10 px-8 py-4 font-montserrat font-semibold text-primary-foreground backdrop-blur-md transition-all duration-300 hover:bg-background/20">
                Watch Film
              </button>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="mx-auto max-w-7xl px-6 pb-12">
          <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {/* Location */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  Location
                </label>

                <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                  <span>Select City</span>
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 size={16} />
                  Property Type
                </label>

                <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                  <span>Commercial Estate</span>
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeDollarSign size={16} />
                  Budget Range
                </label>

                <div className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                  <span>$1M - $5M</span>
                  <ChevronDown size={18} />
                </div>
              </div>

              {/* Search */}
              <div className="flex items-end">
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-montserrat font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90">
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
