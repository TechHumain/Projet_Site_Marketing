import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <h1>Bienvenue sur le projet marketing</h1>
        <p>
          Cette application Next.js embarque l&apos;authentification NextAuth et une
          base de données Prisma. Utilisez la page <Link href="/status">/status</Link> pour
          vérifier la configuration de l&apos;environnement.
        </p>
      </section>
    </main>
  );
}
