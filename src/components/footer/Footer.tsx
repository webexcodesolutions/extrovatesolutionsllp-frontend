import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const links = [["Home", "/"], ["About us", "/about-us"], ["Projects", "/projects"], ["Loan assistance", "/loan-assistance"], ["Contact us", "/contact-us"]];
const services = ["Residential properties", "Commercial spaces", "Property inquiries", "Loan assistance"];
const policies = [["Privacy policy", "/privacy-policy"], ["Terms of service", "/terms-of-service"], ["Cookie policy", "/cookie-policy"], ["Sitemap", "/sitemap"]];

export default function Footer() {
  return <footer className="bg-foreground text-white"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
    <div><Link href="/" aria-label={`${site.name} home`} className="inline-block rounded-sm bg-white p-2"><Image src="/logo.svg" alt={site.name} width={165} height={32} /></Link><p className="mt-5 max-w-xs text-sm leading-6 text-white/70">Property guidance built around your needs.</p>{site.foundedYear && <p className="mt-2 text-sm text-white/70">Established {site.foundedYear}</p>}</div>
    <nav aria-label="Footer quick links"><h2 className="text-sm font-semibold uppercase tracking-[.14em]">Quick links</h2><ul className="mt-5 space-y-1">{links.map(([label, href]) => <li key={href}><Link href={href} className="inline-flex min-h-9 items-center text-sm text-white/70 hover:text-white hover:underline">{label}</Link></li>)}</ul></nav>
    <div><h2 className="text-sm font-semibold uppercase tracking-[.14em]">Services</h2><ul className="mt-5 space-y-3 text-sm text-white/70">{services.map(service => <li key={service}>{service}</li>)}</ul></div>
    <div><h2 className="text-sm font-semibold uppercase tracking-[.14em]">Get in touch</h2><div className="mt-5 space-y-4 text-sm text-white/70">{site.email && <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-white"><Mail size={16} className="mt-0.5 shrink-0 text-secondary-light" />{site.email}</a>}{site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex items-start gap-3 hover:text-white"><Phone size={16} className="mt-0.5 shrink-0 text-secondary-light" />{site.phone}</a>}{site.address && <p className="flex items-start gap-3 whitespace-pre-line"><MapPin size={16} className="mt-0.5 shrink-0 text-secondary-light" />{site.address}</p>}{!site.email && !site.phone && !site.address && <Link href="/contact-us" className="inline-flex min-h-11 items-center underline hover:text-white">Send an inquiry</Link>}</div></div>
  </div><div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p><nav aria-label="Policies" className="flex flex-wrap gap-x-5 gap-y-2">{policies.map(([label, href]) => <Link className="inline-flex min-h-9 items-center hover:text-white hover:underline" key={href} href={href}>{label}</Link>)}</nav></div></div></footer>;
}
