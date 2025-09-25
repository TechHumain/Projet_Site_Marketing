import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container">
      <h1>Tableau de bord</h1>
      <p>
        Bienvenue {session.user?.name ?? session.user?.email}! Ceci est une page protégée accessible
        uniquement aux utilisateurs authentifiés.
      </p>
      <div className="actions">
        <span>Votre identifiant utilisateur : {session.user?.id}</span>
      </div>
    </div>
  );
}
