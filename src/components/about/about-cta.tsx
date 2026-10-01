import Link from "next/link";
import { site } from "@/lib/site";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/85" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[240px] max-w-7xl flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[270px]">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Ready to Define Your Legacy?
        </h2>

        <p className="mt-4 max-w-[460px] text-sm leading-6 text-white/85 sm:text-base">
          Connect with our team to discuss your requirements and
          <br className="hidden sm:block" />
          explore available properties.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact-us"
            className="brand-gold-button flex min-h-11 min-w-[185px] items-center justify-center px-6 text-xs font-semibold uppercase tracking-[1px] transition-colors"
          >
            Consult Your Expert
          </Link>

          {site.brochureUrl && <a
            href={site.brochureUrl}
            className="flex min-h-11 min-w-[185px] items-center justify-center border border-white/70 bg-transparent px-6 text-xs font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-card hover:text-foreground"
          >
            Download Brochure
          </a>}
        </div>
      </div>
    </section>
  );
}
