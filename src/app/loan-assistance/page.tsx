import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  Landmark,
  MessageCircle,
} from "lucide-react";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Loan assistance",
  description: "Discuss property financing requirements and next steps with our team.",
  alternates: { canonical: "/loan-assistance" },
};

const contactHref = "/contact-us?interest=Loan%20assistance";

const advantages = [
  {
    icon: Landmark,
    title: "Explore financing options",
    description:
      "Start with your property goals and compare the information you receive from relevant lenders.",
  },
  {
    icon: ClipboardList,
    title: "Prepare with clarity",
    description:
      "Understand the questions and documents a lender may request before you apply.",
  },
  {
    icon: MessageCircle,
    title: "Speak with our team",
    description:
      "Tell us what you are considering and we can help you identify the next conversation to have.",
  },
  {
    icon: BadgeCheck,
    title: "Keep decisions informed",
    description:
      "Review terms, fees and eligibility directly with a lender before making a commitment.",
  },
];

const steps = [
  {
    number: "01",
    title: "Share your requirements",
    description: "Tell us about the property, approximate budget and preferred timing.",
  },
  {
    number: "02",
    title: "Discuss available routes",
    description: "We help you organize the questions to take to a relevant lender.",
  },
  {
    number: "03",
    title: "Confirm with the lender",
    description: "The lender assesses eligibility and provides any applicable terms.",
  },
];

const questions = [
  {
    question: "Can you confirm the interest rate I will receive?",
    answer:
      "No. Rates and fees depend on the lender, the property and your circumstances. Ask the lender for a written offer and review its full terms.",
  },
  {
    question: "What should I include in my first inquiry?",
    answer:
      "Share the property you are considering, your approximate budget and when you hope to proceed. Please do not send account numbers, identity documents or financial records through this website.",
  },
  {
    question: "Does contacting Extrovate mean I have applied for a loan?",
    answer:
      "No. The contact form starts a conversation only. Any application and eligibility decision are handled by the relevant lender.",
  },
];

export default function Loans() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 -z-20 bg-[url('/hero.svg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/65" />
        <div className="mx-auto flex min-h-[380px] max-w-7xl flex-col justify-center px-6 py-20 sm:min-h-[450px]">
          <p className="eyebrow eyebrow-on-dark">Loan assistance</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Financing Guidance for Your Next Property
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
            Make space for a clearer conversation about your financing needs and
            the steps involved in exploring a property.
          </p>
          <Link
            href={contactHref}
            className="brand-gold-button mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-sm px-6 text-sm font-semibold"
          >
            Start a conversation <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="eyebrow">How we can help</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
              A Clearer Path to Financing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Our role is to help you prepare for informed discussions. Lending
              decisions and terms remain with the lender.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {advantages.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`flex gap-4 border p-6 sm:p-7 ${
                  index === 1 ? "border-primary bg-primary text-white" : "border-border bg-card"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                    index === 1 ? "bg-white/15 text-secondary-light" : "bg-accent text-primary"
                  }`}
                >
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      index === 1 ? "text-white/85" : "text-muted-foreground"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Before you begin</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
              What to Prepare
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A lender may ask about your intended property, income, existing
              commitments and deposit. Exact requirements vary by lender and
              product.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "The property type and location you are considering",
                "Your approximate budget and preferred timeline",
                "Questions about rates, fees and repayment terms",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-card p-4 text-sm">
                  <FileCheck2 size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-secondary-ink" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Helpful answers</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-7 space-y-3">
              {questions.map(({ question, answer }) => (
                <details key={question} className="group border border-border bg-card p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary [&::-webkit-details-marker]:hidden">
                    {question}
                    <span aria-hidden="true" className="text-xl font-normal text-secondary-ink group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="eyebrow">Next steps</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
            Your Path Forward
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="border border-border bg-card p-7 text-left">
                <span className="text-3xl font-semibold text-secondary-ink">{number}</span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">
            Extrovate does not offer a loan application or guarantee eligibility,
            approval, a rate or a particular lender.
          </p>
        </div>
      </section>

      <CTASection primaryHref={contactHref} />
    </>
  );
}
