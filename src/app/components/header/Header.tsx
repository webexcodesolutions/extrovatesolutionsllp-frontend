"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "ABOUT US",
    href: "/about-us",
  },
  {
    name: "PROJECTS",
    href: "/projects",
  },
  {
    name: "CONTACT",
    href: "/contact-us",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#F5F5F5] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Extrovate Solutions LLP"
            width={200}
            height={100}
            priority
            className="h-auto w-35 md:w-45"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative pb-1 font-semibold transition-all duration-300
                after:absolute after:bottom-0 after:left-0
                after:h-0.5 after:bg-[#1E445C]
                after:transition-all after:duration-300
                ${
                  pathname === item.href
                    ? "text-[#1E445C] after:w-full"
                    : "text-gray-700 after:w-0 hover:text-[#1E445C] hover:after:w-full"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden bg-[#123A54] px-5 py-3 font-semibold text-white transition hover:bg-[#0E3046] md:block">
          Enquire Now
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={30} className="dark:invert" />
          ) : (
            <Menu size={30} className="dark:invert" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-125" : "max-h-0"
        }`}
      >
        <nav className="border-t border-gray-200 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 font-medium transition ${
                pathname === item.href
                  ? "border-l-4 border-[#1E445C] bg-gray-300 text-[#1E445C]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile CTA */}
          <div className="p-4">
            <button className="w-full bg-[#123A54] py-3 font-semibold text-white transition hover:bg-[#0E3046]">
              Enquire Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
