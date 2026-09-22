import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { connectDB } from "@/db/mongodb";
import { PropertyController } from "@/controllers/property.controller";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let property;
  try { await connectDB(); property = await new PropertyController().getPropertiesById(slug); } catch { notFound(); }
  if (!property) notFound();
  const item = JSON.parse(JSON.stringify(property));
  const price = item.formattedPrice || new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(item.price);
  return <main className="bg-[#faf9f8]">
    <section className="bg-[#164b66]"><div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10">
      <Link href="/projects" className="inline-flex items-center gap-2 text-[11px] text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" />Back to Projects</Link>
      <div className="mt-8"><p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#c5a021]">{item.propertyType}</p><h1 className="mt-2 text-[36px] font-bold tracking-[-1px] text-white sm:text-[46px]">{item.title}</h1><div className="mt-3 flex items-center gap-2 text-[13px] text-white/80"><MapPin className="h-4 w-4" />{item.location || item.city}</div></div>
    </div></section>
    <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14"><div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={item.images?.[0] || "/assets/images/building.svg"} alt={item.title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div>
      <div><div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-[#c5a021]">Starting From</p><p className="mt-1 text-[28px] font-bold text-[#164b66]">{price}</p></div><span className="rounded-md bg-[#e9c94a] px-3 py-1.5 text-[9px] font-semibold uppercase text-[#403500]">{item.tag || item.status}</span></div>
        <div className="mt-7 border-t border-[#e5e5e5] pt-7"><h2 className="text-[20px] font-semibold text-[#164b66]">Property Overview</h2><p className="mt-4 text-[13px] leading-7 text-[#555]">{item.description}</p></div>
        {item.features?.length > 0 && <div className="mt-7 grid grid-cols-3 gap-3">{item.features.map((feature: { label: string; icon: string }) => <div key={`${feature.icon}-${feature.label}`} className="rounded-lg border border-[#e5e5e5] bg-white p-4 text-center text-[11px] font-medium text-[#444]">{feature.label}</div>)}</div>}
        <div className="mt-7 space-y-3 border-t border-[#e5e5e5] pt-6 text-[12px]"><div className="flex justify-between gap-5"><span className="text-[#777]">Status</span><span className="font-medium text-[#164b66]">{item.status}</span></div><div className="flex justify-between gap-5"><span className="text-[#777]">Developer</span><span className="font-medium text-[#164b66]">{item.developer || "Extrovate Solutions LLP"}</span></div></div>
        <Link href="/contact-us" className="mt-8 flex h-11 w-full items-center justify-center rounded-md bg-[#c5a021] text-[10px] font-semibold uppercase tracking-[1px] text-white hover:bg-[#ad8b16]">Contact Agent</Link>
      </div>
    </div></section>
  </main>;
}
