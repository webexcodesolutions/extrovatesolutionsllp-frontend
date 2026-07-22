"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Extrovate Solutions LLP"
            width={200}
            height={100}
            priority
            className="h-auto w-36 md:w-44"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
            relative pb-1 font-montserrat font-medium transition-all duration-300
            after:absolute after:bottom-0 after:left-0
            after:h-0.5 after:bg-primary
            after:transition-all after:duration-300
            ${
              pathname === item.href
                ? "after:w-full"
                : "text-foreground/80 after:w-0 hover:text-primary hover:after:w-full"
            }
          `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="rounded-md bg-primary px-5 py-3 font-montserrat font-semibold text-primary-foreground transition hover:opacity-90">
            Enquire Now
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md border border-border p-2"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md border border-border p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <nav className="border-t border-border bg-card">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 font-montserrat font-medium transition ${
                pathname === item.href
                  ? "border-l-4 border-primary bg-muted text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="p-4">
            <button className="w-full rounded-md bg-primary py-3 font-montserrat font-semibold text-primary-foreground transition hover:opacity-90">
              Enquire Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
