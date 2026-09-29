"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PROPERTY_TYPES } from "@/lib/property-schema";
import { inquirySchema } from "@/lib/forms";

type FormState = {
  loading: boolean;
  message: string;
  error: boolean;
  fields: Record<string, string[] | undefined>;
};

const inputClasses =
  "min-h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

export function ContactSection({
  propertySlug,
  propertyTitle,
}: {
  propertySlug?: string;
  propertyTitle?: string;
}) {
  const id = useId();
  const pending = useRef(false);
  const [state, setState] = useState<FormState>({
    loading: false,
    message: "",
    error: false,
    fields: {},
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const data = Object.fromEntries(values);
    const parsed = inquirySchema.safeParse({
      ...data,
      consent: values.get("consent") === "on",
      propertySlug,
    });

    if (!parsed.success) {
      const fields: FormState["fields"] = {};
      parsed.error.issues.forEach((issue) => {
        fields[String(issue.path[0])] = [issue.message];
      });
      setState({
        loading: false,
        message: "Please correct the highlighted fields.",
        error: true,
        fields,
      });
      return;
    }

    pending.current = true;
    setState({ loading: true, message: "", error: false, fields: {} });
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15000),
      });
      const payload = await response.json();
      if (!response.ok) {
        setState({
          loading: false,
          message: payload.error || "Please try again.",
          error: true,
          fields: payload.fields || {},
        });
        return;
      }
      form.reset();
      setState({ loading: false, message: payload.message, error: false, fields: {} });
    } catch {
      setState({
        loading: false,
        message: "We couldn’t confirm submission. Please check your connection and try again.",
        error: true,
        fields: {},
      });
    } finally {
      pending.current = false;
    }
  };

  const field = (
    name: string,
    label: string,
    placeholder: string,
    type = "text",
    autoComplete?: string,
  ) => (
    <div className="space-y-2">
      <label htmlFor={`${id}-${name}`} className="block text-[11px] font-semibold uppercase tracking-[.12em] text-foreground">
        {label}
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        maxLength={name === "email" ? 254 : name === "phone" ? 30 : 100}
        minLength={name === "phone" ? 6 : name === "name" ? 2 : undefined}
        className={inputClasses}
        aria-invalid={!!state.fields[name]}
        aria-describedby={state.fields[name] ? `${id}-${name}-error` : undefined}
      />
      {state.fields[name] && (
        <p id={`${id}-${name}-error`} className="text-sm text-destructive">
          {state.fields[name]?.join(" ")}
        </p>
      )}
    </div>
  );

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <p className="eyebrow text-[#d9b947]">Get in touch</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Let’s Frame Your Future.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Whether you’re looking for a distinctive home or a strategic commercial space,
            our team is ready to help you explore what comes next.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.7fr)] lg:gap-14">
          <aside className="space-y-9">
            <div>
              <h2 className="text-xl font-semibold text-primary">Contact Information</h2>
              <div className="mt-7 space-y-6">
                {site.address && (
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dcecf5] text-primary">
                      <MapPin size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[.12em]">Our office</h3>
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-muted-foreground">{site.address}</p>
                    </div>
                  </div>
                )}
                {site.phone && (
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dcecf5] text-primary">
                      <Phone size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[.12em]">Phone</h3>
                      <a className="mt-1 block text-sm leading-6 text-muted-foreground hover:text-primary hover:underline" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
                        {site.phone}
                      </a>
                    </div>
                  </div>
                )}
                {site.email && (
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dcecf5] text-primary">
                      <Mail size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[.12em]">Email</h3>
                      <a className="mt-1 block break-all text-sm leading-6 text-muted-foreground hover:text-primary hover:underline" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </div>
                  </div>
                )}
                {!site.address && !site.phone && !site.email && (
                  <p className="text-sm leading-6 text-muted-foreground">
                    Send us a message using the form and our team will respond.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                <Clock3 size={19} aria-hidden="true" />
                <h3 className="text-lg font-semibold">Plan a Visit</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Contact us to arrange a conversation or ask for office directions.
              </p>
              <a href="#contact-form" className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-primary underline underline-offset-4">
                Send an inquiry
              </a>
            </div>
          </aside>

          <form
            id="contact-form"
            onSubmit={submit}
            className="rounded-lg border border-border bg-card p-6 shadow-[0_12px_40px_rgba(19,63,90,.06)] sm:p-9 lg:p-11"
            aria-busy={state.loading}
          >
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Send a Message</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Fill out the form below and our team will get back to you about your inquiry.
            </p>
            {propertyTitle && propertySlug && (
              <p className="mt-4 rounded-md bg-accent px-4 py-3 text-sm text-primary">
                Regarding: <Link className="font-semibold underline" href={`/projects/${propertySlug}`}>{propertyTitle}</Link>
              </p>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {field("name", "Full name", "Your full name", "text", "name")}
              {field("email", "Email address", "you@example.com", "email", "email")}
              {field("phone", "Phone number", "+1 555 000 0000", "tel", "tel")}
              <div className="space-y-2">
                <label htmlFor={`${id}-interest`} className="block text-[11px] font-semibold uppercase tracking-[.12em]">
                  Interest
                </label>
                <select
                  id={`${id}-interest`}
                  name="interest"
                  required
                  defaultValue=""
                  className={inputClasses}
                  aria-invalid={!!state.fields.interest}
                  aria-describedby={state.fields.interest ? `${id}-interest-error` : undefined}
                >
                  <option value="" disabled>Select property type</option>
                  {[...PROPERTY_TYPES, "Loan assistance", "General inquiry"].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
                {state.fields.interest && (
                  <p id={`${id}-interest-error`} className="text-sm text-destructive">
                    {state.fields.interest.join(" ")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[.12em]" htmlFor={`${id}-message`}>
                Your message
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Tell us about your project or inquiry..."
                className={`${inputClasses} resize-y py-3`}
                aria-invalid={!!state.fields.message}
                aria-describedby={`${id}-message-help`}
              />
              <p id={`${id}-message-help`} className={state.fields.message ? "text-sm text-destructive" : "text-xs text-muted-foreground"}>
                {state.fields.message?.join(" ") || "10–2,000 characters. Please do not include financial account details."}
              </p>
            </div>

            <div hidden aria-hidden="true">
              <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-muted-foreground">
              <input name="consent" type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-primary" />
              <span>
                I agree to the <Link href="/privacy-policy" className="text-secondary underline underline-offset-2">Privacy Policy</Link> and{" "}
                <Link href="/terms-of-service" className="text-secondary underline underline-offset-2">Terms of Service</Link> and consent to being contacted about this inquiry.
              </span>
            </label>
            <button
              disabled={state.loading}
              type="submit"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#ba9b30] px-8 text-xs font-semibold uppercase tracking-[.12em] text-[#152e3f] transition-colors hover:bg-[#d2b24b] disabled:opacity-60"
            >
              {state.loading ? "Submitting…" : "Submit inquiry"}
            </button>
            {state.message && (
              <p role={state.error ? "alert" : "status"} className={`mt-4 text-sm ${state.error ? "text-destructive" : "text-primary"}`}>
                {state.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <section aria-label="Office location" className="relative h-72 overflow-hidden bg-[#e6e7e5] sm:h-96">
        {site.address ? (
          <iframe
            title="Map showing our office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[url('/contact-map.svg')] bg-cover bg-center px-6">
            <div className="rounded-md border border-white/80 bg-white/95 px-6 py-5 text-center shadow-lg">
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary text-white">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-primary">Need directions?</p>
              <a href="#contact-form" className="mt-1 inline-block text-xs text-muted-foreground underline underline-offset-2 hover:text-primary">
                Ask us about visiting the office
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
