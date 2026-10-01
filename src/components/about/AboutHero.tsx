export function AboutHero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto flex min-h-[420px] max-w-7xl items-center px-6 py-20 sm:min-h-[480px]">
        <div className="max-w-[900px]">
          {/* Eyebrow */}
          <p className="eyebrow eyebrow-on-dark">
            About Us
          </p>

          {/* Gold underline */}
          <div className="mt-5 h-[3px] w-14 bg-secondary" />

          {/* Heading */}
          <h1 className="mt-8 max-w-[900px] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Building Legacies,
            <br />
            Defining Excellence.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-[820px] text-base leading-7 text-white/85 sm:text-lg">
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
