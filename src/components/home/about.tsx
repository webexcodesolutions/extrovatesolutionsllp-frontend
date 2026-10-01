import Image from "next/image";

export default function AboutSection() {
  return <section className="bg-background py-20 sm:py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
    <div className="relative border border-border bg-card p-2.5"><div className="relative aspect-[1.12/1] overflow-hidden"><Image src="/about-sample.svg" alt="Residential towers and modern architecture" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div></div>
    <div className="max-w-xl"><p className="eyebrow">Who we are</p><h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-primary sm:text-4xl">A Journey Rooted in Architectural Precision</h2><div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground"><p>Extrovate Solutions LLP helps clients explore residential and commercial properties with a clear view of location, budget and intended use.</p><p>We value thoughtful design and straightforward guidance. Start with our current portfolio, then talk with our team about the details that matter to you.</p></div></div>
  </div></section>;
}
