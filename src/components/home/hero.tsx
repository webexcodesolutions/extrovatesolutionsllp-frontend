import Image from "next/image";
import Link from "next/link";
import PropertyFilters from "@/components/projects/PropertyFilters";
import { site } from "@/lib/site";
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
              <Link href="/projects" className="rounded-md bg-secondary px-8 py-4 font-montserrat font-semibold text-secondary-foreground transition-all duration-300 hover:-translate-y-1 hover:opacity-90">
                Explore Portfolio →
              </Link>

              {site.filmUrl && <a href={site.filmUrl} className="rounded-md border border-primary-foreground/30 bg-background/10 px-8 py-4 font-montserrat font-semibold text-primary-foreground backdrop-blur-md transition-all duration-300 hover:bg-background/20">
                Watch Film
              </a>}
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 pb-12"><PropertyFilters filters={{}} /></div>
      </div>
    </section>
  );
}
