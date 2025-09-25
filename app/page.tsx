import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
      <h1>Bienvenue sur le projet marketing</h1>
      <p>
        Cette application démontre une intégration complète de NextAuth avec Google et GitHub,
        Prisma comme base de données et des routes protégées via middleware.
      </p>
      <div className="actions">
        {session ? (
          <>
            <span>Vous êtes connecté en tant que {session.user?.email ?? session.user?.name}.</span>
            <Link href="/dashboard">Accéder au tableau de bord</Link>
          </>
        ) : (
          <>
            <span>Commencez par vous authentifier.</span>
            <Link href="/login">Se connecter</Link>
          </>
        )}
      </div>
    </div>
  );
}
