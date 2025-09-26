"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./button";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/analyser", label: "Analyser" },
  { href: "/historique", label: "Historique" },
  { href: "/tarifs", label: "Tarifs" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-semibold text-text focus-visible:outline-none"
            aria-label="PubLégalFR"
          >
            PubLégalFR
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors focus-visible:outline-none",
                    isActive
                      ? "text-primary underline decoration-2 underline-offset-8"
                      : "hover:text-primary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/api/auth/signin"
            className="text-sm font-medium text-slate-600 transition-colors focus-visible:outline-none hover:text-primary"
          >
            Connexion
          </Link>
          <Button href="/analyser" size="md" className="hidden sm:inline-flex">
            Analyser maintenant
          </Button>
          <Button href="/analyser" size="md" className="sm:hidden">
            Analyser
          </Button>
        </div>
      </div>
    </header>
  );
}
