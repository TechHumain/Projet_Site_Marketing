import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DeleteAccountButton from "@/app/components/delete-account-button";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container">
      <h1>Mon compte</h1>
      <p>Gérez les informations de votre profil.</p>
      <div className="actions">
        <span>Nom : {session.user?.name ?? "Non renseigné"}</span>
        <span>Email : {session.user?.email ?? "Non renseigné"}</span>
        <DeleteAccountButton />
      </div>
    </div>
  );
}
