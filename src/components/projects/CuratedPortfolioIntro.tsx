export default function CuratedPortfolioIntro() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-[1280px] px-5 py-5 sm:px-6 lg:px-8">
        <h1 className="font-sans text-[26px] font-semibold leading-[1.15] tracking-[-0.5px] text-foreground sm:text-[28px]">
          Our Curated Portfolio
        </h1>

        <p className="mt-2 max-w-[620px] text-[13px] font-normal leading-[1.55] text-[#404040] sm:text-[14px]">
          Discover architectural excellence across our residential and
          commercial
          <br className="hidden sm:block" />
          landscapes. From ready-to-move luxury apartments to strategic new
          launches.
        </p>
      </div>
    </section>
  );
}
