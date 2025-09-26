"use client";

import { useEffect, useId, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
              const baseHref = link.href.split("#")[0] || "/";
              const isSamePageLink = link.href.includes("#");
              const isActive = !isSamePageLink && pathname.startsWith(baseHref);

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
        <div className="flex items-center gap-3 sm:hidden">
          <Link href="/#contact" className="btn-meet">
            Nous rencontrer
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-expanded={isMenuOpen}
            aria-controls={navId}
            aria-label={isMenuOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? "Fermer" : "Ouvrir"} le menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <line x1="4" x2="20" y1="7" y2="7" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="17" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        id={navId}
        className={cn(
          "sm:hidden",
          "transition-opacity duration-200",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="border-t border-slate-200 bg-white/95 shadow-sm">
          <nav aria-label="Navigation principale mobile" className="container flex flex-col gap-4 py-6">
            <ul className="flex flex-col gap-3 text-base font-semibold text-slate-700">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-visible:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="btn-meet w-full justify-center" onClick={() => setIsMenuOpen(false)}>
              Nous rencontrer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
