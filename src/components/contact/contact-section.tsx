"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { PROPERTY_TYPES } from "@/lib/property-schema";
import { inquirySchema } from "@/lib/forms";

type FormState = { loading: boolean; message: string; error: boolean; fields: Record<string, string[] | undefined> };
export function ContactSection({ propertySlug, propertyTitle }: { propertySlug?: string; propertyTitle?: string }) {
  const id = useId(); const pending = useRef(false);
  const [state, setState] = useState<FormState>({ loading: false, message: "", error: false, fields: {} });
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (pending.current) return;
    const form = event.currentTarget; const values = new FormData(form);
    const data = Object.fromEntries(values); const parsed = inquirySchema.safeParse({ ...data, consent: values.get("consent") === "on", propertySlug });
    if (!parsed.success) {
      const fields: FormState["fields"] = {}; parsed.error.issues.forEach(issue => { fields[String(issue.path[0])] = [issue.message]; });
      setState({ loading: false, message: "Please correct the highlighted fields.", error: true, fields }); return;
    }
    pending.current = true; setState({ loading: true, message: "", error: false, fields: {} });
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(15000) });
      const payload = await response.json();
      if (!response.ok) { setState({ loading: false, message: payload.error || "Please try again.", error: true, fields: payload.fields || {} }); return; }
      form.reset(); setState({ loading: false, message: payload.message, error: false, fields: {} });
    } catch { setState({ loading: false, message: "We couldn’t confirm submission. Please check your connection and try again.", error: true, fields: {} }); }
    finally { pending.current = false; }
  };
  const field = (name: string, label: string, type = "text", autoComplete?: string) => <div className="space-y-2"><label htmlFor={`${id}-${name}`} className="block text-sm font-medium">{label}</label><input id={`${id}-${name}`} name={name} type={type} autoComplete={autoComplete} required maxLength={name === "email" ? 254 : name === "phone" ? 30 : 100} minLength={name === "phone" ? 6 : name === "name" ? 2 : undefined} className="h-12 w-full rounded-md border bg-background px-3" aria-invalid={!!state.fields[name]} aria-describedby={state.fields[name] ? `${id}-${name}-error` : undefined} />{state.fields[name] && <p id={`${id}-${name}-error`} className="text-sm text-destructive">{state.fields[name]?.join(" ")}</p>}</div>;
  return <section className="mx-auto max-w-7xl px-6 py-14"><h1 className="text-4xl font-bold">Let’s discuss your next property</h1><p className="mt-4 max-w-2xl text-muted-foreground">Tell us what you are looking for and our team will help you explore the next steps.</p>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr]"><aside><h2 className="text-xl font-semibold">Contact information</h2><div className="mt-5 space-y-4">
      {site.address && <p className="whitespace-pre-line">{site.address}</p>}{site.phone && <a className="block underline" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>}{site.email && <a className="block break-all underline" href={`mailto:${site.email}`}>{site.email}</a>}
      {!site.email && !site.phone && !site.address && <p className="text-muted-foreground">Use the inquiry form to reach our team.</p>}
    </div></aside>
    <form onSubmit={submit} className="space-y-6 rounded-xl border bg-card p-6 sm:p-8" aria-busy={state.loading}>
      <h2 className="text-2xl font-semibold">Send an inquiry</h2>{propertyTitle && <p>Regarding: <Link className="underline" href={`/projects/${propertySlug}`}>{propertyTitle}</Link></p>}
      <div className="grid gap-5 sm:grid-cols-2">{field("name", "Full name", "text", "name")}{field("email", "Email address", "email", "email")}{field("phone", "Phone number", "tel", "tel")}
        <div className="space-y-2"><label htmlFor={`${id}-interest`} className="block text-sm font-medium">Interest</label><select id={`${id}-interest`} name="interest" required defaultValue="" className="h-12 w-full rounded-md border bg-background px-3" aria-invalid={!!state.fields.interest}><option value="" disabled>Select an interest</option>{[...PROPERTY_TYPES, "Loan assistance", "General inquiry"].map(value => <option key={value}>{value}</option>)}</select>{state.fields.interest && <p className="text-sm text-destructive">{state.fields.interest.join(" ")}</p>}</div>
      </div>
      <div><label className="mb-2 block text-sm font-medium" htmlFor={`${id}-message`}>Your message</label><textarea id={`${id}-message`} name="message" required minLength={10} maxLength={2000} rows={5} className="w-full rounded-md border bg-background p-3" aria-invalid={!!state.fields.message} aria-describedby={`${id}-message-help`} /><p id={`${id}-message-help`} className="text-sm text-muted-foreground">{state.fields.message?.join(" ") || "10–2,000 characters. Please do not include financial account details."}</p></div>
      <div hidden aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-sm"><input name="consent" type="checkbox" required className="mt-1 size-5 shrink-0" /><span>I agree to the <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and <Link href="/terms-of-service" className="underline">Terms of Service</Link> and consent to being contacted about this inquiry.</span></label>
      <button disabled={state.loading} type="submit" className="min-h-12 rounded-md bg-primary px-6 text-primary-foreground disabled:opacity-60">{state.loading ? "Submitting…" : "Submit inquiry"}</button>
      {state.message && <p role={state.error ? "alert" : "status"} className={state.error ? "text-destructive" : "text-foreground"}>{state.message}</p>}
    </form></div>
  </section>;
}
