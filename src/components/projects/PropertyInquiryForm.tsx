"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { inquirySchema } from "@/lib/forms";
import type { PublicProperty } from "@/lib/property-schema";

type Props = {
  propertySlug: string;
  propertyType: PublicProperty["propertyType"];
};

const inputClass =
  "min-h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

export default function PropertyInquiryForm({ propertySlug, propertyType }: Props) {
  const id = useId();
  const pending = useRef(false);
  const [state, setState] = useState({ loading: false, error: false, message: "" });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const parsed = inquirySchema.safeParse({
      ...Object.fromEntries(values),
      consent: values.get("consent") === "on",
      interest: propertyType,
      propertySlug,
    });
    if (!parsed.success) {
      setState({
        loading: false,
        error: true,
        message: parsed.error.issues[0]?.message || "Please check your details.",
      });
      return;
    }

    pending.current = true;
    setState({ loading: true, error: false, message: "" });
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15000),
      });
      const payload = await response.json();
      if (!response.ok) {
        setState({ loading: false, error: true, message: payload.error || "Please try again." });
        return;
      }
      form.reset();
      setState({ loading: false, error: false, message: payload.message });
    } catch {
      setState({
        loading: false,
        error: true,
        message: "We couldn’t confirm submission. Please check your connection and try again.",
      });
    } finally {
      pending.current = false;
    }
  };

  return (
    <form
      onSubmit={submit}
      aria-busy={state.loading}
      className="border border-border bg-card p-6 shadow-lg shadow-primary/5"
    >
      <div className="-mx-6 -mt-6 mb-6 bg-primary px-6 py-5 text-white">
        <h2 className="text-xl font-semibold">Inquire About This Property</h2>
        <p className="mt-2 text-sm leading-5 text-white/80">
          Share your details and our team will get back to you.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { name: "name", label: "Full name", type: "text", placeholder: "Your full name", autoComplete: "name" },
          { name: "email", label: "Email address", type: "email", placeholder: "you@example.com", autoComplete: "email" },
          { name: "phone", label: "Phone number", type: "tel", placeholder: "Your phone number", autoComplete: "tel" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={`${id}-${field.name}`} className="mb-2 block text-xs font-semibold uppercase tracking-wider">
              {field.label}
            </label>
            <input
              id={`${id}-${field.name}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              minLength={field.name === "name" ? 2 : field.name === "phone" ? 6 : undefined}
              maxLength={field.name === "email" ? 254 : field.name === "phone" ? 30 : 100}
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label htmlFor={`${id}-message`} className="mb-2 block text-xs font-semibold uppercase tracking-wider">
            Message
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={2000}
            placeholder="Tell us what you would like to know..."
            className={`${inputClass} resize-y py-3`}
          />
        </div>
      </div>
      <div hidden aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-primary" />
        <span>
          I agree to the <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link> and{" "}
          <Link href="/terms-of-service" className="text-primary underline">Terms of Service</Link> and consent to being contacted about this inquiry.
        </span>
      </label>
      <button
        type="submit"
        disabled={state.loading}
        className="brand-gold-button mt-5 min-h-11 w-full rounded-sm px-5 text-xs font-semibold uppercase tracking-wider disabled:opacity-60"
      >
        {state.loading ? "Submitting…" : "Request property information"}
      </button>
      {state.message && (
        <p role={state.error ? "alert" : "status"} className={`mt-4 text-sm ${state.error ? "text-destructive" : "text-primary"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
