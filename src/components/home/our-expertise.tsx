import Link from "next/link";
import { ArrowUpRight, Building2, Globe2, Handshake, Home, Landmark, TrendingUp } from "lucide-react";

const expertise = [
  { title: "Residential sales", description: "Homes that match your space and location needs.", icon: Home },
  { title: "Commercial leasing", description: "Spaces suited to the way your business works.", icon: Building2 },
  { title: "Investment inquiries", description: "Information to help you assess opportunities.", icon: TrendingUp },
  { title: "Remote buyers", description: "Explore properties and arrange a conversation from afar.", icon: Globe2 },
  { title: "Property guidance", description: "Discuss options and plan the next steps.", icon: Handshake },
  { title: "Project discovery", description: "Browse developments by type, status and budget.", icon: Landmark },
];

export default function ExpertiseSection() {
  return <section className="bg-background py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
    <div><p className="eyebrow">Our expertise</p><h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-primary sm:text-4xl">Delivering Excellence Through Experience</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Explore residential and commercial properties, compare the details and connect with our team when you are ready.</p><Link href="/contact-us" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90">Enquire now <ArrowUpRight size={16} /></Link></div>
    <div className="grid gap-3 sm:grid-cols-2">{expertise.map(({ title, description, icon: Icon }) => <div className="flex gap-3 rounded-lg border border-border bg-card p-5" key={title}><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-secondary/40 text-secondary-ink"><Icon size={19} aria-hidden="true" /></span><div><h3 className="text-sm font-semibold text-primary">{title}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p></div></div>)}</div>
  </div></section>;
}
