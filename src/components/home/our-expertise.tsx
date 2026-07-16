import Link from "next/link";
import {
  Building2,
  Landmark,
  TrendingUp,
  Globe,
  Handshake,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const expertise = [
  {
    title: "Residential Sales",
    description: "Premium homes matching your lifestyle and legacy.",
    icon: Building2,
  },
  {
    title: "Commercial Leasing",
    description: "Strategic spaces for business growth and retail.",
    icon: Landmark,
  },
  {
    title: "Investment Advisory",
    description: "Data-backed insights to maximize your ROI.",
    icon: TrendingUp,
  },
  {
    title: "NRI Services",
    description: "End-to-end support from search to documentation.",
    icon: Globe,
  },
  {
    title: "Tenant Representation",
    description: "Negotiating best terms with cost-efficiency.",
    icon: Handshake,
  },
  {
    title: "Project Marketing",
    description: "Exclusive mandates for top-tier developers.",
    icon: Megaphone,
  },
];

export default function ExpertiseSection() {
  return (
    <section className="bg-[#F8F8F8] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[4px] text-[#C6A128] uppercase">
              Our Expertise
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#123A54] md:text-5xl">
              Delivering Excellence
              <br />
              Through Experience
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-gray-600">
              Comprehensive Real Estate Solutions Tailored for You. We provide a
              full spectrum of services from residential sales to commercial
              leasing, ensuring every aspect of your real estate journey is
              covered with professionalism, transparency, and integrity.
            </p>

            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-2 bg-[#123A54] px-6 py-4 font-semibold text-white transition hover:bg-[#0E3046]"
            >
              Enquire Now
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {expertise.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A128] hover:shadow-lg"
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C6A128]/30 bg-[#C6A128]/5">
                      <Icon size={22} className="text-[#C6A128]" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-semibold text-[#123A54]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
