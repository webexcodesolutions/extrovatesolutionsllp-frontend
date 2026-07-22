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
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-secondary">
              OUR EXPERTISE
            </p>

            <h2 className="font-montserrat text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Delivering Excellence
              <br />
              Through Experience
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Comprehensive Real Estate Solutions Tailored for You. We provide a
              full spectrum of services from residential sales to commercial
              leasing, ensuring every aspect of your real estate journey is
              covered with professionalism, transparency, and integrity.
            </p>

            <Link
              href="/contact-us"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-6 py-4 font-montserrat font-semibold text-primary-foreground transition-all duration-300 hover:gap-3 hover:opacity-90"
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
                  className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} className="text-secondary" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-montserrat text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
