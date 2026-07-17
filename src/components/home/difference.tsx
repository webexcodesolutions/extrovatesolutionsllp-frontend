import Image from "next/image";
import { BadgeCheck, ShieldCheck, Handshake } from "lucide-react";

const stats = [
  {
    value: "20+",
    title: "YEARS OF TRUST",
  },
  {
    value: "240+",
    title: "PROPERTIES SOLD",
  },
  {
    value: "1200+",
    title: "HAPPY CLIENTS",
  },
  {
    value: "18+",
    title: "AWARDS WON",
  },
];

const features = [
  {
    title: "Unmatched Expertise",
    description:
      "Our consultants possess deep market knowledge of luxury property trends across the globe.",
    icon: BadgeCheck,
  },
  {
    title: "Foundational Trust",
    description:
      "Transparency and ethics are the pillars of every partnership we build with our clients.",
    icon: ShieldCheck,
  },
  {
    title: "White-Glove Support",
    description:
      "Dedicated concierge services for a seamless property acquisition and ownership experience.",
    icon: Handshake,
  },
];

export default function DifferenceSection() {
  return (
    <>
      {/* Stats Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] md:h-[320px]">
          <Image
            src="/stats-bg.jpg"
            alt="Luxury Property"
            fill
            className="object-cover"
          />

          {/* Theme Overlay */}
          <div className="absolute inset-0 bg-primary/85" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((item) => (
                <div key={item.title} className="text-center">
                  <h2 className="font-montserrat text-4xl font-bold text-secondary md:text-6xl">
                    {item.value}
                  </h2>

                  <p className="mt-3 text-xs font-semibold tracking-[4px] text-primary-foreground md:text-sm">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden rounded-xl">
                <Image
                  src="/difference/1.jpg"
                  alt="Meeting"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* ISO */}
              <div className="flex h-[220px] flex-col justify-center rounded-xl bg-primary p-8 text-primary-foreground">
                <BadgeCheck size={40} className="text-secondary" />

                <h3 className="font-montserrat mt-6 text-xl font-semibold">
                  ISO Certified
                </h3>
              </div>

              {/* Quote */}
              <div className="flex h-[220px] items-center rounded-xl bg-secondary p-8">
                <p className="text-lg italic text-secondary-foreground">
                  &quot;Excellence is not an art,
                  <br />
                  but a habit.&quot;
                </p>
              </div>

              {/* Image */}
              <div className="relative h-[220px] overflow-hidden rounded-xl">
                <Image
                  src="/difference/2.jpg"
                  alt="Building"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[4px] text-secondary">
                THE EXTROVATE DIFFERENCE
              </p>

              <h2 className="font-montserrat mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Redefining the Standards of Premium Service
              </h2>

              <p className="mt-8 text-lg leading-8 text-muted-foreground">
                At Extrovate Solutions, we believe that real estate is more than
                just transactions; it&apos;s about curating a lifestyle of
                luxury, security, and architectural beauty.
              </p>

              <div className="mt-12 space-y-8">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="group flex gap-5">
                      {/* Icon */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 group-hover:border-secondary">
                        <Icon size={24} className="text-secondary" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-montserrat text-xl font-semibold text-foreground">
                          {feature.title}
                        </h3>

                        <p className="mt-2 leading-7 text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
