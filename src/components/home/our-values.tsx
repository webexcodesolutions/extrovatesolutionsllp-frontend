import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Wallet, ArrowRight } from "lucide-react";

export default function ValuesSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl border-x border-border">
        {/* Main Section */}
        <div className="grid gap-12 px-6 py-16 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-secondary">
              OUR VALUES
            </p>

            <h2 className="font-montserrat mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Excellence Through Values
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Our values shape every decision we make and every service we
              provide. We are committed to integrity, quality, innovation, and
              customer satisfaction, building lasting relationships based on
              trust and excellence.
            </p>

            {/* Mission & Vision */}
            <div className="mt-10 space-y-6">
              {/* Mission */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Target size={24} className="text-secondary" />
                  </div>

                  <div>
                    <h3 className="font-montserrat text-2xl font-semibold text-foreground">
                      Our Mission
                    </h3>

                    <p className="mt-2 leading-7 text-muted-foreground">
                      To deliver exceptional solutions that empower customers,
                      inspire growth, and create lasting positive impact every
                      day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Eye size={24} className="text-secondary" />
                  </div>

                  <div>
                    <h3 className="font-montserrat text-2xl font-semibold text-foreground">
                      Our Vision
                    </h3>

                    <p className="mt-2 leading-7 text-muted-foreground">
                      To become a trusted leader by driving innovation,
                      delivering excellence, and creating a better future for
                      everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-lg">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl sm:h-[450px] lg:h-[600px] lg:w-[500px]">
                <Image
                  src="/values/luxury-villa.jpg"
                  alt="Luxury Villa"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-border bg-card px-6 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary">
                <Wallet size={28} className="text-primary-foreground" />
              </div>

              <div>
                <h3 className="font-montserrat text-xl font-semibold text-foreground">
                  Exclusive Financial Solutions
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
                  Access bespoke mortgage rates and tailored loan assistance
                  through our elite banking partners.
                </p>
              </div>
            </div>

            <Link
              href="/loan-assistance"
              className="flex items-center gap-2 font-montserrat font-semibold tracking-wide text-secondary transition-all duration-300 hover:gap-4"
            >
              LEARN ABOUT LOANS
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
