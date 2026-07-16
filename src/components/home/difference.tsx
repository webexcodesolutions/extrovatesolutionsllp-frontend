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
      <section className="relative">
        <div className="relative h-[250px] md:h-[300px]">
          <Image
            src="/stats-bg.jpg"
            alt="Luxury Property"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#123A54]/80" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((item) => (
                <div key={item.title} className="text-center">
                  <h2 className="text-4xl font-bold text-[#C6A128] md:text-6xl">
                    {item.value}
                  </h2>

                  <p className="mt-3 text-xs font-semibold tracking-[4px] text-white md:text-sm">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="bg-[#F8F8F8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1 */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src="/difference/1.jpg"
                  alt="Meeting"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ISO Card */}
              <div className="flex h-[220px] flex-col justify-center bg-[#3A6488] p-8 text-white">
                <BadgeCheck size={40} />

                <h3 className="mt-6 text-xl font-medium">ISO Certified</h3>
              </div>

              {/* Quote */}
              <div className="flex h-[220px] items-center bg-[#B89A27] p-8">
                <p className="text-lg italic text-white">
                  &quot;Excellence is not an art,
                  <br />
                  but a habit.&quot;
                </p>
              </div>

              {/* Image 2 */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src="/difference/2.jpg"
                  alt="Building"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>
              <p className="text-sm font-semibold tracking-[4px] text-[#C6A128]">
                THE EXTROVATE DIFFERENCE
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#123A54] md:text-6xl">
                Redefining the Standards of Premium Service
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-600">
                At Extrovate Solutions, we believe that real estate is more than
                just transactions; it&apos;s about curating a lifestyle of
                luxury, security, and architectural beauty.
              </p>

              <div className="mt-12 space-y-8">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="flex gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200">
                        <Icon size={24} className="text-[#C6A128]" />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-[#123A54]">
                          {feature.title}
                        </h3>

                        <p className="mt-2 text-gray-600">
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
