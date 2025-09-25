import "@/app/globals.css";
import Link from "next/link";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/app/components/session-provider";
import AuthStatus from "@/app/components/auth-status";

export const metadata: Metadata = {
  title: "Projet Site Marketing",
  description: "Application de démonstration avec NextAuth"
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <body>
        <SessionProvider session={session}>
          <header>
            <Link href="/">Projet</Link>
            <nav className="navLinks">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/account">Mon compte</Link>
            </nav>
            <AuthStatus />
          </header>
          <main>{children}</main>
          <footer className="footer">
            Propulsé par Next.js, NextAuth et Prisma.
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
