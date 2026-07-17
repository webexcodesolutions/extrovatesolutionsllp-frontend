import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/cta-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Theme Overlay */}
        <div className="absolute inset-0 bg-primary/90" />

        {/* Optional Pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Subtitle */}
            <p className="text-sm font-semibold uppercase tracking-[4px] text-secondary">
              LET&apos;S BUILD YOUR LEGACY
            </p>

            {/* Heading */}
            <h2 className="font-montserrat mt-4 max-w-4xl text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Ready to Define Your Legacy?
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-primary-foreground/80 md:text-lg">
              Connect with our senior consultants today for a private viewing of
              our exclusive off-market portfolio and discover investment
              opportunities crafted for generations.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/contact-us"
                className="rounded-md bg-secondary px-8 py-4 text-center font-montserrat text-sm font-semibold uppercase tracking-[2px] text-secondary-foreground transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
              >
                CONSULT YOUR EXPERT
              </Link>

              <Link
                href="/brochure.pdf"
                target="_blank"
                className="rounded-md border border-primary-foreground/30 bg-background/10 px-8 py-4 text-center font-montserrat text-sm font-semibold uppercase tracking-[2px] text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background hover:text-foreground"
              >
                DOWNLOAD BROCHURE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
