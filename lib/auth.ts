import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const criticalEnvVars = [
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "DATABASE_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_ID",
  "GITHUB_SECRET"
] as const;

export type CriticalEnvVar = (typeof criticalEnvVars)[number];

export const providerStatus = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET)
};

export const authOptions: NextAuthOptions = {
  providers: [
    ...(providerStatus.google
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
        ]
      : []),
    ...(providerStatus.github
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
          })
        ]
      : [])
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
};

export function getEnvPresence() {
  return criticalEnvVars.map((key) => ({ key, present: Boolean(process.env[key]) }));
}

export function isNextAuthConfigured() {
  return Object.values(providerStatus).some(Boolean);
}
