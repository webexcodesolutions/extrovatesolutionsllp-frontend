import { Clock3, Mail, MapPin, Phone, Share2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  return (
    <main className="bg-[#faf9f7]">
      {/* Hero */}
      <section className="bg-[#164b66]">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#c6a227]">
            Get In Touch
          </p>

          <h1 className="mt-2 max-w-[520px] text-[38px] font-bold leading-[1.08] tracking-[-1px] text-white sm:text-[42px]">
            Let&apos;s Frame Your
            <br />
            Future.
          </h1>

          <p className="mt-4 max-w-[620px] text-[13px] leading-[1.6] text-white/85">
            Whether you are looking for an architectural masterpiece or a
            strategic commercial investment, our team is ready to provide
            personalized guidance.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[1280px] px-5 py-9 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[235px_minmax(0,1fr)]">
          <ContactInfo />

          <ContactForm />
        </div>
      </section>
    </main>
  );
}

function ContactInfo() {
  return (
    <aside>
      <h2 className="text-[15px] font-semibold leading-5 text-[#164b66]">
        Contact Information
      </h2>

      <div className="mt-6 space-y-7">
        <ContactItem
          icon={MapPin}
          label="Our Office"
          children={
            <>
              122nd Floor, Burj Khalifa Business Suites,
              <br />
              Downtown Dubai, UAE
            </>
          }
        />

        <ContactItem
          icon={Phone}
          label="Phone"
          children={
            <>
              +971 54 555 0192
              <br />
              +971 50 123 4567
            </>
          }
        />

        <ContactItem
          icon={Mail}
          label="Email"
          children={
            <>
              enquiries@extrovate.com
              <br />
              support@extrovate.com
            </>
          }
        />
      </div>

      {/* Office Hours */}
      <div className="mt-8 rounded-xl bg-white p-4 shadow-[0_3px_14px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#164b66]" />

          <h3 className="text-[14px] font-semibold leading-5 text-[#164b66]">
            Office Hours
          </h3>
        </div>

        <div className="mt-4 space-y-3">
          <OfficeHour day="Monday - Friday" time="09:00 AM - 06:00 PM" />

          <OfficeHour day="Saturday" time="10:00 AM - 04:00 PM" />

          <OfficeHour day="Sunday" time="Closed" closed />
        </div>
      </div>

      {/* Social */}
      <div className="mt-7">
        <p className="text-[10px] font-medium uppercase tracking-[1px] text-[#555]">
          Follow Us
        </p>

        <div className="mt-3 flex gap-2">
          <SocialButton>
            <Share2 />
          </SocialButton>

          <SocialButton>
            <span className="text-[12px] font-bold">◎</span>
          </SocialButton>

          <SocialButton>
            <Users />
          </SocialButton>
        </div>
      </div>
    </aside>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9edf7]">
        <Icon className="h-4 w-4 text-[#164b66]" strokeWidth={1.7} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35px] text-[#333]">
          {label}
        </p>

        <div className="mt-1.5 text-[11px] leading-[1.6] text-[#555]">
          {children}
        </div>
      </div>
    </div>
  );
}

function OfficeHour({
  day,
  time,
  closed = false,
}: {
  day: string;
  time: string;
  closed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#eeeeee] pb-2.5 last:border-0 last:pb-0">
      <span className="text-[11px] text-[#444]">{day}</span>

      <span
        className={`text-[10px] ${closed ? "text-red-500" : "text-[#28708d]"}`}
      >
        {time}
      </span>
    </div>
  );
}

function SocialButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7d7d7] text-[#164b66] transition-colors hover:border-[#164b66] hover:bg-[#164b66] hover:text-white"
    >
      <span className="[&>svg]:h-4 [&>svg]:w-4">{children}</span>
    </button>
  );
}

function ContactForm() {
  return (
    <Card className="rounded-xl border-[#e5e5e5] bg-white p-0 shadow-[0_3px_18px_rgba(0,0,0,0.05)]">
      <CardContent className="p-7 sm:p-8 lg:p-9">
        <h2 className="text-[24px] font-semibold leading-7 text-[#164b66]">
          Send a Message
        </h2>

        <p className="mt-2 max-w-[600px] text-[12px] leading-[1.6] text-[#666]">
          Fill out the form below and one of our expert consultants will get
          back to you within 24 hours.
        </p>

        <form className="mt-7 space-y-5">
          {/* Name / Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Full Name">
              <Input
                placeholder="John Doe"
                className="h-10 rounded-[5px] border-[#d5d9dd] px-3 text-[13px] text-[#333] placeholder:text-[#999]"
              />
            </FormField>

            <FormField label="Email Address">
              <Input
                type="email"
                placeholder="john@example.com"
                className="h-10 rounded-[5px] border-[#d5d9dd] px-3 text-[13px] text-[#333] placeholder:text-[#999]"
              />
            </FormField>
          </div>

          {/* Phone / Interest */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Phone Number">
              <Input
                placeholder="+1 (555) 000-0000"
                className="h-10 rounded-[5px] border-[#d5d9dd] px-3 text-[13px] text-[#333] placeholder:text-[#999]"
              />
            </FormField>

            <FormField label="Interest">
              <Select>
                <SelectTrigger className="h-10 rounded-[5px] border-[#d5d9dd] text-[13px] text-[#555]">
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>

                  <SelectItem value="commercial">Commercial</SelectItem>

                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Message */}
          <FormField label="Your Message">
            <Textarea
              placeholder="Tell us about your project or enquiry..."
              className="min-h-[100px] resize-none rounded-[5px] border-[#d5d9dd] px-3 py-3 text-[13px] leading-5 text-[#333] placeholder:text-[#999]"
            />
          </FormField>

          {/* Privacy */}
          <label className="flex items-start gap-2 text-[11px] leading-4 text-[#555]">
            <input
              type="checkbox"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#ccc]"
            />

            <span>
              I agree to the{" "}
              <a
                href="/privacy"
                className="text-[#806500] underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              and terms of service.
            </span>
          </label>

          {/* Submit */}
          <Button
            type="submit"
            className="h-10 rounded-[5px] bg-[#c29c1e] px-7 text-[10px] font-semibold uppercase tracking-[0.7px] text-white hover:bg-[#aa8715]"
          >
            Submit Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-semibold uppercase tracking-[0.45px] text-[#333]">
        {label}
      </Label>

      {children}
    </div>
  );
}
