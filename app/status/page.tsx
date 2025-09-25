import { cookies } from "next/headers";
import Link from "next/link";
import { getEnvPresence, isNextAuthConfigured, providerStatus } from "@/lib/auth";
import { prismaHealthcheck } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStatus() {
  const [db] = await Promise.all([prismaHealthcheck()]);
  const env = getEnvPresence();
  const consentCookie = cookies().get("pp_consent");

  return {
    db,
    env,
    nextAuth: {
      configured: isNextAuthConfigured(),
      providers: providerStatus
    },
    cookies: {
      pp_consent: Boolean(consentCookie)
    }
  };
}

function formatStatus(value: boolean) {
  return value ? "OK" : "Absent";
}

function statusClass(value: boolean, warning = false) {
  if (value) return "status-value ok";
  return warning ? "status-value warning" : "status-value error";
}

export default async function StatusPage() {
  const status = await getStatus();

  return (
    <main>
      <section className="card">
        <h1>Statut de la plateforme</h1>
        <p>
          Consultez la <Link href="/">page d&apos;accueil</Link> pour revenir au tableau de bord.
        </p>
        <div className="status-grid" role="list">
          <article className="status-card" role="listitem">
            <h3>Base de données</h3>
            <p className={statusClass(status.db.ok)}>
              {status.db.ok ? "Connexion réussie" : status.db.message ?? "Erreur inconnue"}
            </p>
          </article>

          <article className="status-card" role="listitem">
            <h3>NextAuth</h3>
            <p className={statusClass(status.nextAuth.configured)}>
              {status.nextAuth.configured
                ? "Au moins un provider configuré"
                : "Aucun provider OAuth configuré"}
            </p>
            <ul>
              <li className={statusClass(status.nextAuth.providers.google)}>
                Google Provider: {formatStatus(status.nextAuth.providers.google)}
              </li>
              <li className={statusClass(status.nextAuth.providers.github)}>
                GitHub Provider: {formatStatus(status.nextAuth.providers.github)}
              </li>
            </ul>
          </article>

          <article className="status-card" role="listitem">
            <h3>Variables d&apos;environnement critiques</h3>
            <ul>
              {status.env.map(({ key, present }) => (
                <li key={key} className={statusClass(present)}>
                  {key}: {formatStatus(present)}
                </li>
              ))}
            </ul>
          </article>

          <article className="status-card" role="listitem">
            <h3>Cookies</h3>
            <p className={statusClass(status.cookies.pp_consent, true)}>
              Cookie pp_consent: {status.cookies.pp_consent ? "Déposé" : "Absent"}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
