import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#F8F8F8] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative">
            {/* Border Frame */}
            <div className="border border-gray-300 p-4">
              <div className="relative h-100 md:h-125">
                <Image
                  src="/about-sample.svg"
                  alt="Extrovate Solutions"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#C6A128]">
              WHO WE ARE
            </p>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-[#123A54] md:text-6xl">
              A Journey Rooted in
              <br />
              Architectural Precision
            </h2>

            <div className="mt-10 space-y-8 text-lg leading-9 text-gray-600">
              <p>
                Founded on the principles of &quot;Corporate Modernism,&quot;
                Extrovate Solutions LLP began as a boutique advisory firm with a
                singular vision: to treat every property investment as a
                masterwork. Over the decades, we have evolved into a premier
                full-service real estate partner, known for our unwavering
                commitment to quality and architectural integrity.
              </p>

              <p>
                Our history is marked by prestigious milestones and partnerships
                with high-net-worth investors who demand more than just square
                footage. They demand a legacy. We have meticulously curated a
                portfolio that reflects the intersection of functionality and
                high-art aesthetic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
