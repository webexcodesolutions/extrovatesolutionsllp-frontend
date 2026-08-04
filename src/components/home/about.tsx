import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card p-3 shadow-lg transition-all duration-500 hover:shadow-2xl">
              <div className="relative h-[350px] overflow-hidden rounded-lg md:h-[500px]">
                <Image
                  src="/about-sample.svg"
                  alt="Extrovate Solutions"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            {/* Subtitle */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-secondary">
              WHO WE ARE
            </p>

            {/* Title */}
            <h2 className="font-montserrat max-w-2xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              A Journey Rooted in
              <br />
              Architectural Precision
            </h2>

            {/* Description */}
            <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground md:text-lg">
              <p>
                Founded on the principles of{" "}
                <span className="font-semibold text-foreground">
                  Corporate Modernism
                </span>
                , Extrovate Solutions LLP began as a boutique advisory firm with
                a singular vision: to treat every property investment as a
                masterwork.
              </p>

              <p>
                Over the years, we have evolved into a premier full-service real
                estate partner, known for our unwavering commitment to quality,
                innovation, and architectural integrity.
              </p>

              <p>
                Our history is marked by prestigious milestones and strategic
                partnerships with discerning investors who seek more than just
                square footage—they seek a legacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
