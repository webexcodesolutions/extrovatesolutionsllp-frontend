import Link from "next/link";
import { site } from "@/lib/site";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-[#164b66]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#073b55]/85" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[240px] max-w-[1280px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[270px] sm:px-8 lg:px-10">
        <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.5px] text-white sm:text-[32px]">
          Ready to Define Your Legacy?
        </h2>

        <p className="mt-4 max-w-[460px] text-sm leading-[1.55] text-white/85 sm:text-[12px]">
          Connect with our team to discuss your requirements and
          <br className="hidden sm:block" />
          explore available properties.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact-us"
            className="flex min-h-11 min-w-[185px] items-center justify-center bg-secondary px-6 text-xs font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#ad8b16]"
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
