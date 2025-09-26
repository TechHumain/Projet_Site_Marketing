import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import { cn } from "../lib/utils";
import { Navbar } from "../components/ui/navbar";
import { CookieBanner } from "../components/compliance/CookieBanner";
import { Button } from "../components/ui/button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "PubLégalFR – Audit marketing premium",
  description:
    "Identifiez vos leviers de croissance et sécurisez la conformité de vos campagnes grâce à un audit marketing 360°.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className="h-full bg-white">
      <body className={cn(inter.className, "min-h-screen bg-section-fade text-text antialiased")}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <CookieBanner />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-white/95">
      <div className="container flex flex-col gap-8 py-10 text-sm text-slate-600">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-text">PubLégalFR</p>
          <p className="max-w-2xl text-sm text-slate-500">
            L’équipe data, acquisition et CRM qui accélère vos campagnes tout en sécurisant leur conformité juridique et
            publicitaire.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          {[
            { href: "/#services", label: "Expertises" },
            { href: "/#methodologie", label: "Méthodologie" },
            { href: "/legal/mentions-legales", label: "Mentions légales" },
            { href: "/legal/confidentialite", label: "Confidentialité" },
            { href: "/legal/cookies", label: "Cookies" },
            { href: "/tarifs", label: "Tarifs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors focus-visible:outline-none hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">© {year} PubLégalFR. Tous droits réservés.</p>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="manage-cookies w-full justify-center text-sm font-medium text-slate-600 sm:w-auto"
            onClick={() => {
              if (typeof document !== "undefined") {
                document.dispatchEvent(new CustomEvent("cookie-banner:open"));
              }
            }}
          >
            Gérer mes cookies
          </Button>
        </div>
      </div>
    </footer>
  );
}
