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
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.svg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#C6A128]">
            PREMIER REAL ESTATE INVESTMENTS
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Redefining the
            <br />
            <span className="text-[#C6A128]">Architecture</span> of
            <br />
            Investment
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Experience a paradigm shift in property acquisition. We blend
            structural precision with financial mastery to secure your legacy.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="bg-[#C6A128] px-8 py-4 font-semibold text-white transition hover:bg-[#B59220]">
              Explore Portfolio →
            </button>

            <button className="border border-gray-500 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
              Watch Film
            </button>
          </div>
        </div>
      </div>

      {/* Search Card */}
      <div className="absolute bottom-6 left-1/2 z-20 w-[95%] max-w-7xl -translate-x-1/2">
        <div className="rounded-lg bg-white p-6 shadow-2xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                Location
              </label>

              <div className="flex items-center justify-between border p-3">
                <span>Select City</span>
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Building2 size={16} />
                Property Type
              </label>

              <div className="flex items-center justify-between border p-3">
                <span>Commercial Estate</span>
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <BadgeDollarSign size={16} />
                Budget Range
              </label>

              <div className="flex items-center justify-between border p-3">
                <span>$1M - $5M</span>
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Search */}
            <div className="flex items-end">
              <button className="flex w-full items-center justify-center gap-2 bg-[#123A54] px-6 py-[14px] font-semibold text-white transition hover:bg-[#0E3046]">
                <Search size={18} />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
