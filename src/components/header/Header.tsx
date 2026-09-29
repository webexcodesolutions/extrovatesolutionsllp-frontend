"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [["Home", "/"], ["About us", "/about-us"], ["Projects", "/projects"], ["Loan page", "/loan-assistance"], ["Contact", "/contact-us"]];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const navigation = items.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active(href) ? "page" : undefined} className={`inline-flex min-h-10 items-center border-b-2 px-1 text-[11px] font-semibold uppercase tracking-[.1em] transition-colors ${active(href) ? "border-primary text-primary" : "border-transparent text-foreground hover:border-secondary hover:text-primary"}`}>{label}</Link>);
  return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md"><div className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-between gap-4 px-6"><Link href="/" aria-label="Extrovate Solutions LLP home"><Image src="/logo.svg" alt="Extrovate Solutions LLP" width={200} height={39} priority className="h-auto w-40 lg:w-44" /></Link><nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">{navigation}</nav><div className="flex items-center gap-3"><Link href="/contact-us" className="hidden min-h-11 items-center justify-center rounded-sm bg-primary px-6 text-xs font-semibold text-white hover:bg-primary/90 sm:inline-flex">Enquire now</Link><button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-sm border border-border lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button></div></div><nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="border-t border-border bg-background px-6 py-4 lg:hidden"><div className="flex flex-col items-start gap-2">{navigation}</div><Link href="/contact-us" onClick={() => setOpen(false)} className="mt-4 inline-flex min-h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-white sm:hidden">Enquire now</Link></nav></header>;
}
