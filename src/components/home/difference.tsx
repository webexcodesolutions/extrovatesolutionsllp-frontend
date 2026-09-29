import Image from "next/image";
import { BadgeCheck, Compass, Handshake } from "lucide-react";

const strengths = [
  { title: "A considered selection", text: "Compare homes and commercial spaces by the details that matter to you.", icon: BadgeCheck },
  { title: "Clear information", text: "Review location, status and pricing before deciding what to explore next.", icon: Compass },
  { title: "Personal guidance", text: "Send an inquiry when you are ready to discuss a property in more detail.", icon: Handshake },
];

export default function DifferenceSection() {
  return <>
    <section className="relative overflow-hidden bg-primary py-12 text-white"><div className="absolute inset-0 bg-[linear-gradient(90deg,#123e59ee,#123e59dc),url('/hero.svg')] bg-cover bg-center" /><div className="relative mx-auto grid max-w-7xl gap-6 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">{["Thoughtful design", "Clear information", "Property choice", "Personal guidance"].map((value, index) => <div key={value} className="border-white/20 py-5 lg:border-r lg:last:border-r-0"><span className="text-3xl font-semibold text-[#ddba46]">0{index + 1}</span><p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em]">{value}</p></div>)}</div></section>
    <section className="bg-background py-20 sm:py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
      <div className="grid grid-cols-2 gap-3"><div className="relative row-span-2 min-h-[370px] overflow-hidden"><Image src="/assets/images/iso-certified.svg" alt="Property consultation in progress" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" /></div><div className="flex min-h-40 items-end bg-primary p-5 text-2xl font-semibold text-white">Spaces with purpose.</div><div className="relative min-h-48 overflow-hidden"><Image src="/assets/images/modern-building.svg" alt="Contemporary building exterior" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" /></div></div>
      <div><p className="eyebrow">The Extrovate difference</p><h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-primary sm:text-4xl">Redefining the Standards of Premium Service</h2><p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">A property search deserves useful information, considered options and room to ask better questions.</p><div className="mt-7 space-y-6">{strengths.map(({ title, text, icon: Icon }) => <div key={title} className="flex gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#dec980] text-[#9b791a]"><Icon size={20} aria-hidden="true" /></span><div><h3 className="text-base font-semibold text-primary">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div></div>
    </div></section>
  </>;
}
