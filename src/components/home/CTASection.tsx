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
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#123A54]/90" />

        {/* Pattern Overlay (Optional) */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="max-w-3xl text-4xl font-bold text-white md:text-6xl">
              Ready to Define Your Legacy?
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 md:text-lg">
              Connect with our senior consultants today for a private viewing of
              our exclusive off-market portfolio.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/contact-us"
                className="bg-[#C6A128] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#B39220]"
              >
                CONSULT YOUR EXPERT
              </Link>

              <Link
                href="/brochure.pdf"
                target="_blank"
                className="border border-white/50 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-white hover:text-[#123A54]"
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
