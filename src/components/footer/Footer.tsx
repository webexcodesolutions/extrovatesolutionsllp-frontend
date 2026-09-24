"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
export default function Footer() {
  const [status, setStatus] = useState({ loading: false, message: "", error: false }); const pending = useRef(false);
  const subscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (pending.current) return;
    const form = event.currentTarget; const data = new FormData(form);
    pending.current = true; setStatus({ loading: true, message: "", error: false });
    try {
      const response = await fetch("/api/subscriptions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on", website: data.get("website") }), signal: AbortSignal.timeout(15000) });
      const payload = await response.json(); setStatus({ loading: false, message: payload.message || payload.error || "Please try again.", error: !response.ok });
      if (response.ok) form.reset();
    } catch { setStatus({ loading: false, message: "Unable to confirm signup. Please check your connection and try again.", error: true }); }
    finally { pending.current = false; }
  };
  return <footer className="border-t bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
    <div><Link href="/" aria-label={`${site.name} home`}><Image src="/logo.svg" alt={site.name} width={200} height={39} className="rounded bg-white p-2" /></Link><p className="mt-5 leading-7">Property guidance built around your needs.</p>{site.foundedYear && <p className="mt-2">Established {site.foundedYear}</p>}{site.address && <p className="mt-5 whitespace-pre-line">{site.address}</p>}{site.email && <a className="mt-3 block break-all underline" href={`mailto:${site.email}`}>{site.email}</a>}{site.phone && <a className="mt-3 block underline" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>}</div>
    <nav aria-label="Footer"><h2 className="text-xl font-semibold">Explore</h2><ul className="mt-4 space-y-1">{[["Home", "/"], ["About us", "/about-us"], ["Properties", "/projects"], ["Loan assistance", "/loan-assistance"], ["Contact us", "/contact-us"]].map(([label, href]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center hover:underline">{label}</Link></li>)}</ul></nav>
    <div><h2 className="text-xl font-semibold">Property updates</h2><p className="mt-4">Sign up for property updates. Confirm your email to subscribe; unsubscribe at any time.</p><form onSubmit={subscribe} className="mt-5 space-y-4" aria-busy={status.loading}><label htmlFor="newsletter-email" className="block">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} className="h-12 w-full rounded-md border bg-background px-3 text-foreground" /><div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" aria-label="Leave empty" /></div><label className="flex items-start gap-3 text-sm"><input type="checkbox" name="consent" required className="mt-1 size-5 shrink-0" /><span>I agree to receive email updates under the <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</span></label><button disabled={status.loading} className="min-h-11 rounded-md bg-white px-5 font-medium text-primary disabled:opacity-60">{status.loading ? "Submitting…" : "Subscribe"}</button>{status.message && <p role={status.error ? "alert" : "status"} className="text-sm">{status.message}</p>}</form></div>
  </div><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 border-t border-white/20 px-6 py-6 text-sm"><p>© {new Date().getFullYear()} {site.name}</p><nav aria-label="Policies" className="flex flex-wrap gap-5">{[["Privacy", "/privacy-policy"], ["Terms", "/terms-of-service"], ["Cookies", "/cookie-policy"], ["Sitemap", "/sitemap"]].map(([label, href]) => <Link className="inline-flex min-h-11 items-center underline" key={href} href={href}>{label}</Link>)}</nav></div></footer>;
}
