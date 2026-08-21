export function AboutHero() {
  return (
    <section className="bg-[#174c67] text-white">
      <div className="mx-auto flex min-h-[540px] max-w-[1536px] items-center px-10 py-20 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[900px]">
          {/* Eyebrow */}
          <p className="text-[14px] font-semibold uppercase tracking-[2px] text-[#c5a021] sm:text-[16px]">
            About Us
          </p>

          {/* Gold underline */}
          <div className="mt-5 h-[3px] w-14 bg-[#c5a021]" />

          {/* Heading */}
          <h1 className="mt-8 max-w-[900px] text-[48px] font-bold leading-[1.05] tracking-[-1.8px] sm:text-[60px] md:text-[68px] lg:text-[76px]">
            Building Legacies,
            <br />
            Defining Excellence.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-[820px] text-[18px] leading-[1.75] text-[#a9cce5] sm:text-[20px]">
            Extrovate Solutions LLP is more than a real estate firm; we are
            architects of aspiration and
            <br className="hidden md:block" />
            guardians of investment integrity.
          </p>
        </div>
      </div>
    </section>
  );
}
