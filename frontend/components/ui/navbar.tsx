"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "./button";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/analyser", label: "Analyser" },
  { href: "/historique", label: "Historique" },
  { href: "/tarifs", label: "Tarifs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="border-b border-border/80 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-text focus-visible:outline-none"
          aria-label="PubLegalFR"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-[0_10px_20px_rgba(31,58,224,0.35)]">
            PL
          </span>
          PubLegalFR
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors focus-visible:outline-none",
                  isActive ? "text-primary" : "hover:text-primary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/connexion"
            className="text-sm font-medium text-slate-600 transition-colors focus-visible:outline-none hover:text-primary"
          >
            Connexion
          </Link>
          <Button href="/analyser" size="md">
            Analyser maintenant
          </Button>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-muted focus-visible:outline-none md:hidden"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="18" y2="6" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <div className="flex h-full w-full items-center justify-center p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex w-full max-w-sm flex-col gap-6 rounded-3xl bg-white/95 p-6 shadow-xl">
              <nav className="flex flex-col gap-4 text-lg font-semibold text-slate-700">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-border/60 transition hover:bg-primary/10"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Link
                  href="/connexion"
                  className="rounded-2xl bg-white/80 px-4 py-3 text-center text-base font-medium text-slate-600 shadow-sm ring-1 ring-border/60 transition hover:text-primary"
                  onClick={closeMenu}
                >
                  Connexion
                </Link>
                <Link
                  href="/analyser"
                  className={buttonVariants({ className: "w-full" })}
                  onClick={closeMenu}
                >
                  Analyser maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
