"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Aperture, Mail, MapPin, Phone, Share2, UsersRound } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/property-schema";
import { inquirySchema } from "@/lib/forms";

type FormState = {
  loading: boolean;
  message: string;
  error: boolean;
  fields: Record<string, string[] | undefined>;
};

const inputClasses =
  "min-h-12 w-full rounded-lg border border-input bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

// Sample contact details supplied in the design reference; replace when final details are approved.
const referenceContact = {
  address: ["122nd Floor, Burj Khalifa Business Suites,", "Downtown Dubai, UAE"],
  phones: ["+971 4 555 0192", "+971 50 123 4567"],
  emails: ["enquiries@extrovate.com", "support@extrovate.com"],
};

const fieldLabelClasses = "block text-sm font-medium uppercase tracking-[.04em] text-[#454b52]";

export function ContactSection({
  propertySlug,
  propertyTitle,
  defaultInterest,
}: {
  propertySlug?: string;
  propertyTitle?: string;
  defaultInterest?: string;
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
      <label htmlFor={`${id}-${name}`} className={fieldLabelClasses}>
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
          <p className="eyebrow eyebrow-on-dark">Get in touch</p>
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
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-6">
          <aside>
            <div>
              <h2 className="text-2xl font-semibold text-primary">Contact Information</h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#cae6ff] text-primary">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className={fieldLabelClasses}>Our office</h3>
                    <p className="mt-1 text-base leading-6 text-foreground">
                      {referenceContact.address.map((line) => <span className="block" key={line}>{line}</span>)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#cae6ff] text-primary">
                    <Phone size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className={fieldLabelClasses}>Phone</h3>
                    {referenceContact.phones.map((phone) => (
                      <a className="block text-base leading-6 text-foreground hover:text-primary hover:underline" href={`tel:${phone.replace(/[^+\d]/g, "")}`} key={phone}>
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#cae6ff] text-primary">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className={fieldLabelClasses}>Email</h3>
                    {referenceContact.emails.map((email) => (
                      <a className="block break-all text-base leading-6 text-foreground hover:text-primary hover:underline" href={`mailto:${email}`} key={email}>
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-[#f6f4f3] p-7 shadow-sm sm:p-8">
              <h3 className="text-2xl font-semibold text-primary">Office Hours</h3>
              <dl className="mt-5 text-sm sm:text-base">
                <div className="flex justify-between gap-2 border-b border-[#d1d6d9] py-3">
                  <dt>Monday - Friday</dt><dd className="text-right text-primary">09:00 AM - 06:00 PM</dd>
                </div>
                <div className="flex justify-between gap-2 border-b border-[#d1d6d9] py-3">
                  <dt>Saturday</dt><dd className="text-right text-primary">10:00 AM - 04:00 PM</dd>
                </div>
                <div className="flex justify-between gap-2 pt-3">
                  <dt>Sunday</dt><dd className="text-right text-red-600">Closed</dd>
                </div>
              </dl>
            </div>
            <div className="mt-9">
              <h3 className={fieldLabelClasses}>Follow us</h3>
              <div className="mt-3 flex gap-3" aria-hidden="true">
                {[Share2, Aperture, UsersRound].map((Icon, index) => (
                  <span className="flex size-10 items-center justify-center rounded-full border border-input text-primary" key={index}>
                    <Icon size={20} />
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <form
            id="contact-form"
            onSubmit={submit}
            className="rounded-xl border border-border bg-white p-7 shadow-lg shadow-primary/5 sm:p-10 lg:p-14"
            aria-busy={state.loading}
          >
            <h2 className="text-3xl font-semibold text-primary sm:text-4xl">Send a Message</h2>
            <p className="mt-4 max-w-2xl text-base leading-6 text-[#454b52]">
              Fill out the form below and one of our expert consultants will get back to you within 24 hours.
            </p>
            {propertyTitle && propertySlug && (
              <p className="mt-4 rounded-md bg-accent px-4 py-3 text-sm text-primary">
                Regarding: <Link className="font-semibold underline" href={`/projects/${propertySlug}`}>{propertyTitle}</Link>
              </p>
            )}

            <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {field("name", "Full name", "John Doe", "text", "name")}
              {field("email", "Email address", "john@example.com", "email", "email")}
              {field("phone", "Phone number", "+1 (555) 000-0000", "tel", "tel")}
              <div className="space-y-2">
                <label htmlFor={`${id}-interest`} className={fieldLabelClasses}>
                  Interest
                </label>
                <select
                  id={`${id}-interest`}
                  name="interest"
                  required
                  defaultValue={defaultInterest || ""}
                  className={inputClasses}
                  aria-invalid={!!state.fields.interest}
                  aria-describedby={state.fields.interest ? `${id}-interest-error` : undefined}
                >
                  <option value="" disabled>Select Property Type</option>
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

            <div className="mt-8 space-y-2">
              <label className={fieldLabelClasses} htmlFor={`${id}-message`}>
                Your message
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Tell us about your project or enquiry..."
                className={`${inputClasses} min-h-[140px] resize-y py-3`}
                aria-invalid={!!state.fields.message}
                aria-describedby={state.fields.message ? `${id}-message-error` : `${id}-message-help`}
              />
              <p id={`${id}-message-help`} className="sr-only">10–2,000 characters. Please do not include financial account details.</p>
              {state.fields.message && <p id={`${id}-message-error`} className="text-sm text-destructive">{state.fields.message.join(" ")}</p>}
            </div>

            <div hidden aria-hidden="true">
              <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className="mt-8 flex items-start gap-3 text-sm leading-6 text-[#454b52] sm:text-base">
              <input name="consent" type="checkbox" required className="mt-1 size-5 shrink-0 accent-primary" />
              <span>
                I agree to the <Link href="/privacy-policy" className="text-secondary-ink underline underline-offset-2">Privacy Policy</Link> and{" "}
                <Link href="/terms-of-service" className="hover:underline hover:underline-offset-2">terms of service</Link>.
              </span>
            </label>
            <button
              disabled={state.loading}
              type="submit"
              className="brand-gold-button mt-7 inline-flex min-h-14 min-w-60 items-center justify-center rounded-lg px-8 text-sm font-medium uppercase tracking-[.1em] transition-colors disabled:opacity-60"
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

      <section aria-label="Office location" className="relative h-72 overflow-hidden bg-muted sm:h-96">
        <div className="flex h-full items-center justify-center bg-[url('/contact-map.svg')] bg-cover bg-center px-6">
          <div className="rounded-md border border-white/80 bg-white/95 px-6 py-5 text-center shadow-lg">
            <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary text-white">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold text-primary">Extrovate Solutions LLP</p>
          </div>
        </div>
      </section>
    </>
  );
}
