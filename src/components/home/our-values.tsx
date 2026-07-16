import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Wallet, ArrowRight } from "lucide-react";

export default function ValuesSection() {
  return (
    <section className="bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl border-x border-gray-200">
        {/* Main Section */}
        <div className="grid gap-12 px-6 py-16 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold tracking-[4px] text-[#C6A128]">
              OUR VALUES
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#123A54] md:text-5xl">
              Excellence Through Values
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-gray-600">
              Our values shape every decision we make and every service we
              provide. We are committed to integrity, quality, innovation, and
              customer satisfaction, building lasting relationships based on
              trust and excellence.
            </p>

            {/* Mission */}
            <div className="mt-10 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200">
                    <Target size={24} className="text-[#C6A128]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#123A54]">
                      Our Mission
                    </h3>

                    <p className="mt-2 text-gray-600">
                      To deliver exceptional solutions that empower customers,
                      inspire growth, and create lasting positive impact every
                      day.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200">
                    <Eye size={24} className="text-[#C6A128]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#123A54]">
                      Our Vision
                    </h3>

                    <p className="mt-2 text-gray-600">
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
            <div className="overflow-hidden border border-gray-300 p-2 shadow-lg">
              <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[600px] lg:w-[500px]">
                <Image
                  src="/values/luxury-villa.jpg"
                  alt="Luxury Villa"
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-gray-200 bg-white px-6 py-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#123A54]">
                <Wallet size={28} className="text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#123A54]">
                  Exclusive Financial Solutions
                </h3>

                <p className="mt-1 text-gray-600">
                  Access bespoke mortgage rates and tailored loan assistance
                  through our elite banking partners.
                </p>
              </div>
            </div>

            <Link
              href="/loan-assistance"
              className="flex items-center gap-2 font-semibold tracking-wide text-[#C6A128] transition hover:gap-4"
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
