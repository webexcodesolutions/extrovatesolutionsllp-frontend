"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Extrovate Solutions LLP"
                width={200}
                height={100}
                className="rounded-md bg-white p-2"
              />
            </Link>

            <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
              Crafting exclusive living experiences through architectural
              precision and professional integrity since 2008.
            </p>

            <div className="mt-8 flex gap-4">
              {[Globe, Mail, Phone].map((Icon, index) => (
                <button
                  key={index}
                  className="rounded-full border border-primary-foreground/20 p-3 transition-all duration-300 hover:border-secondary hover:text-secondary"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat mb-8 text-2xl font-semibold tracking-[3px]">
              QUICK LINKS
            </h3>

            <ul className="space-y-4">
              {[
                ["Home", "/"],
                ["About Us", "/about-us"],
                ["Projects", "/projects"],
                ["Loan Assistance", "/loan-assistance"],
                ["Contact Us", "/contact-us"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-primary-foreground/80 transition hover:text-secondary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat mb-8 text-2xl font-semibold tracking-[3px]">
              SERVICES
            </h3>

            <ul className="space-y-4 text-primary-foreground/80">
              <li>Property Acquisition</li>
              <li>Loan Assistance</li>
              <li>Legal Consultation</li>
              <li>Market Analysis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat mb-8 text-2xl font-semibold tracking-[3px]">
              GET IN TOUCH
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-secondary" size={20} />
                <span className="text-primary-foreground/80">
                  info@extrovate.com
                </span>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-secondary" size={20} />
                <span className="text-primary-foreground/80">
                  +91 22 4567 8901
                </span>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-secondary" size={20} />
                <span className="text-primary-foreground/80">
                  Level 8, Executive Tower,
                  <br />
                  BKC, Mumbai - 400051
                </span>
              </div>
            </div>

            <p className="mt-8 text-primary-foreground/80">
              Subscribe to receive exclusive off-market listings and market
              insights.
            </p>

            {/* Newsletter */}
            <div className="mt-6 flex overflow-hidden rounded-md border border-primary-foreground/20">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-card px-4 py-4 text-foreground outline-none placeholder:text-muted-foreground"
              />

              <button className="bg-secondary px-6 text-secondary-foreground transition hover:opacity-90">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 text-sm text-primary-foreground/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Extrovate Solutions LLP. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms of Service", "/terms-of-service"],
              ["Cookie Policy", "/cookie-policy"],
              ["Sitemap", "/sitemap"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="transition hover:text-secondary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
