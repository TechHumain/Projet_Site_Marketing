"use client";

import { signIn } from "next-auth/react";
import { useTransition } from "react";

export default function LoginButtons() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = (provider: "google" | "github") => {
    startTransition(() => {
      void signIn(provider, { callbackUrl: "/dashboard" });
    });
  };

  return (
    <div className="actions">
      <button type="button" onClick={() => handleSignIn("google")} disabled={isPending}>
        Continuer avec Google
      </button>
      <button type="button" onClick={() => handleSignIn("github")} disabled={isPending}>
        Continuer avec GitHub
      </button>
    </div>
  );
}
