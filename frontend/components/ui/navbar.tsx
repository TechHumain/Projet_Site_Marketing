"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#methodologie", label: "Méthodologie" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass-nav sticky top-0 z-40">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/#top"
          className="flex items-center gap-4 text-left focus-visible:outline-none"
          aria-label="Retour à l'accueil"
        >
          <span className="brand-logo bg-brand-gradient text-base" aria-hidden="true">
            AM
          </span>
          <div className="leading-tight">
            <span className="block font-heading text-lg font-semibold text-brand-dark">Audit Marketing</span>
            <span className="block text-sm text-slate-500">
              Visibilité et performance digitale, sans approximation.
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Navigation principale">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isSamePageLink = link.href.includes("#");
              const isActive = isSamePageLink ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn("nav-underline focus-visible:outline-none", isActive && "nav-underline-active")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/#contact" className="btn-meet">
            Nous rencontrer
          </Link>
        </nav>
        <Link href="/#contact" className="btn-meet sm:hidden">
          Nous rencontrer
        </Link>
      </div>
    </header>
  );
}
