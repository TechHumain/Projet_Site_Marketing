import type { Metadata } from "next";
import "./globals.css";

const metadataBase = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL) : undefined;

export const metadata: Metadata = {
  title: "Projet Site Marketing",
  description: "Application Next.js avec NextAuth et Prisma",
  ...(metadataBase ? { metadataBase } : {})
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
