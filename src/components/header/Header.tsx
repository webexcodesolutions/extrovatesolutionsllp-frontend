"use client";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
const items = [["Home", "/"], ["About us", "/about-us"], ["Projects", "/projects"], ["Contact", "/contact-us"]];
const subscribe = () => () => {};
export default function Header() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false); const dark = mounted && resolvedTheme === "dark";
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const navigation = items.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active(href) ? "page" : undefined} className={`flex min-h-11 items-center px-3 ${active(href) ? "font-semibold underline underline-offset-8" : "text-muted-foreground"}`}>{label}</Link>);
  return <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3"><Link href="/" aria-label="Extrovate Solutions LLP home"><Image src="/logo.svg" alt="Extrovate Solutions LLP" width={200} height={39} priority className="h-auto w-36 rounded bg-white p-1 md:w-44" /></Link><nav aria-label="Main" className="hidden gap-3 md:flex">{navigation}</nav><div className="flex items-center gap-2"><button type="button" disabled={!mounted} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} onClick={() => setTheme(dark ? "light" : "dark")} className="flex size-11 items-center justify-center rounded-md border">{dark ? <Sun size={20} /> : <Moon size={20} />}</button><Link className="hidden min-h-11 items-center rounded-md bg-primary px-4 text-primary-foreground lg:flex" href="/contact-us">Enquire now</Link><button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-md border md:hidden">{open ? <X /> : <Menu />}</button></div></div><nav id="mobile-navigation" aria-label="Mobile" hidden={!open} className="border-t bg-background p-4 md:hidden">{navigation}<Link className="mt-4 flex min-h-11 items-center justify-center rounded-md bg-primary text-primary-foreground" href="/contact-us" onClick={() => setOpen(false)}>Enquire now</Link></nav></header>;
}
