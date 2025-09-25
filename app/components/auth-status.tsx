"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTransition } from "react";

export default function AuthStatus() {
  const { status, data } = useSession();
  const [isPending, startTransition] = useTransition();

  if (status === "loading") {
    return <span>Chargement...</span>;
  }

  if (status === "authenticated" && data?.user) {
    return (
      <div className="actions" style={{ flexDirection: "row", gap: "0.5rem" }}>
        <span>Bonjour&nbsp;{data.user.name ?? data.user.email ?? "Utilisateur"}</span>
        <button
          type="button"
          onClick={() =>
            startTransition(() => {
              void signOut({ callbackUrl: "/login" });
            })
          }
          disabled={isPending}
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="actions" style={{ flexDirection: "row", gap: "0.5rem" }}>
      <Link href="/login">Connexion</Link>
    </div>
  );
}
