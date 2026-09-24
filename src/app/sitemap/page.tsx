import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sitemap", alternates: { canonical: "/sitemap" } };
export default function SitemapPage() { return <section className="mx-auto max-w-3xl p-10"><h1 className="text-3xl font-semibold">Sitemap</h1><ul className="mt-6 space-y-3">{[["Home", "/"], ["About us", "/about-us"], ["Properties", "/projects"], ["Contact", "/contact-us"], ["Loan assistance", "/loan-assistance"], ["Privacy policy", "/privacy-policy"], ["Terms of service", "/terms-of-service"], ["Cookie policy", "/cookie-policy"]].map(([label, href]) => <li key={href}><Link className="inline-flex min-h-11 items-center underline" href={href}>{label}</Link></li>)}</ul></section>; }
