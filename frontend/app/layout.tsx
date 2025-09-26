import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import { cn } from "../lib/utils";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Projet Site Marketing",
  description: "Application Next.js 14 initialisée avec App Router et TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className="h-full bg-white">
      <body className={cn(inter.className, "min-h-screen bg-muted text-text antialiased")}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
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
    <footer className="border-t border-border bg-white">
      <div className="container flex flex-col gap-6 py-8 text-sm text-slate-600">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          {[
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
