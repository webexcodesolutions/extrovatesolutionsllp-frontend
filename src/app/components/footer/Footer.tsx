"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
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

            <p className="mt-6 text-lg leading-9 text-gray-300">
              Crafting exclusive living experiences through architectural
              precision and professional integrity since 2008.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="border border-gray-700 p-3 transition hover:border-white">
                <Globe size={18} />
              </button>

              <button className="border border-gray-700 p-3 transition hover:border-white">
                <Mail size={18} />
              </button>

              <button className="border border-gray-700 p-3 transition hover:border-white">
                <Phone size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-8 text-3xl font-semibold tracking-widest">
              QUICK LINKS
            </h3>

            <ul className="space-y-5 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/projects" className="hover:text-white">
                  Projects
                </Link>
              </li>

              <li>
                <Link href="/loan-assistance" className="hover:text-white">
                  Loan Assistance
                </Link>
              </li>

              <li>
                <Link href="/contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-8 text-3xl font-semibold tracking-widest">
              SERVICES
            </h3>

            <ul className="space-y-5 text-gray-300">
              <li>Property Acquisition</li>
              <li>Loan Assistance</li>
              <li>Legal Consultation</li>
              <li>Market Analysis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-8 text-3xl font-semibold tracking-widest">
              GET IN TOUCH
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-yellow-500" size={20} />
                <span className="text-gray-300">info@extrovate.com</span>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-yellow-500" size={20} />
                <span className="text-gray-300">+91 22 4567 8901</span>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-yellow-500" size={20} />
                <span className="text-gray-300">
                  Level 8, Executive Tower,
                  <br />
                  BKC, Mumbai - 400051
                </span>
              </div>
            </div>

            <p className="mt-8 text-gray-300">
              Subscribe to receive exclusive off-market listings and market
              insights.
            </p>

            {/* Newsletter */}
            <div className="mt-6 flex overflow-hidden">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white px-4 py-4 text-black outline-none"
              />

              <button className="bg-[#B89A27] px-6 transition hover:bg-[#A58720]">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 text-sm text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Extrovate Solutions LLP. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>

            <Link href="/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>

            <Link href="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
