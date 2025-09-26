import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const features = [
  {
    title: "Score global",
    description:
      "Obtenez un score de conformité instantané et des recommandations classées par priorité.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="12" />
        <path d="M16 8v8l5 5" />
      </svg>
    ),
  },
  {
    title: "Export PDF",
    description:
      "Générez un rapport détaillé conforme aux attentes des équipes juridiques et compliance.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 4h12l8 8v16H8z" />
        <path d="M20 4v8h8" />
        <path d="M12 20h8" />
        <path d="M12 24h12" />
      </svg>
    ),
  },
  {
    title: "Historique",
    description:
      "Suivez l'évolution de vos analyses et conservez un registre conforme pour chaque campagne.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 12a10 10 0 1110 10" />
        <path d="M16 8v6l4 2" />
        <path d="M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const supportPoints = [
  "Un service pensé pour les équipes marketing, juridique et compliance.",
  "Disponible pour les TPE, PME et agences.",
];

function ArrowRightIcon() {
  return (
    <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 6l4 4-4 4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 2h6l4 4v12H7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2v4h4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <section className="container flex flex-col items-center gap-12 py-24 text-center sm:py-28">
        <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 shadow-sm">
          <span className="relative inline-flex h-6 w-12 items-center rounded-full bg-slate-100 p-1">
            <span className="inline-flex h-4 w-4 rounded-full bg-primary shadow-[0_8px_15px_rgba(31,58,224,0.35)]" />
          </span>
          Conformité publicitaire instantanée
        </div>

        <div className="space-y-5 text-balance sm:space-y-6">
          <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
            Analysez la conformité de vos publicités en 60 secondes
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Testez les refus de campagne Facebook, Google Ads et autres plateformes. Notre IA spécialisée vérifie la conformité
            RGPD, mentions légales et réglementations françaises.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Button href="/analyser" size="lg" className="w-full sm:w-auto">
            Analyser une landing page
            <ArrowRightIcon />
          </Button>
          <Button href="/historique" variant="secondary" size="lg" className="w-full sm:w-auto">
            Voir un exemple de rapport
            <DocumentIcon />
          </Button>
        </div>

        <div className="space-y-2 text-sm font-medium text-slate-500">
          {supportPoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex h-full flex-col items-start gap-4 text-left">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {feature.icon}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
