import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import PropertyFilters from "@/components/projects/PropertyFilters";
import { site } from "@/lib/site";

export default function Hero() {
  return <>
    <section className="relative isolate overflow-hidden bg-primary text-white">
      <Image src="/hero.svg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,66,94,.42)_0%,rgba(19,66,94,.23)_52%,rgba(19,66,94,.10)_100%)]" />
      <div className="mx-auto flex min-h-[570px] max-w-7xl items-center px-6 py-24 sm:min-h-[630px] lg:min-h-[680px]">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-on-dark">Premier real estate investments</p>
          <h1 className="mt-5 font-heading text-[clamp(2.8rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white">Redefining the<br /><span className="text-secondary-light">Architecture</span> of<br />Investment</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg">Explore carefully selected properties and find a space that fits your plans.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="brand-gold-button inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-7 text-sm font-semibold transition-colors">Explore portfolio <ArrowUpRight size={17} /></Link>
            {site.filmUrl && <a href={site.filmUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-white/60 bg-black/20 px-7 text-sm font-medium text-white hover:bg-white/10"><Play size={15} /> Watch film</a>}
          </div>
        </div>
      </div>
    </section>
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:-mt-1"><PropertyFilters filters={{}} variant="hero" /></div>
  </>;
}
