"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";

export default function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const response = await fetch("/api/account/delete", {
        method: "DELETE"
      });

      if (response.ok) {
        await signOut({ callbackUrl: "/login" });
      } else {
        console.error("Suppression impossible", await response.text());
      }
    });
  };

  return (
    <button type="button" onClick={handleDelete} disabled={isPending}>
      Supprimer mon compte
    </button>
  );
}
