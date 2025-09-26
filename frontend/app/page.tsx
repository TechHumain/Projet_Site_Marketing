import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const features = [
  {
    title: "Score Global",
    description: "Note instantanée avec indicateurs visuels.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12.5L9 17.5L20 6.5" />
      </svg>
    ),
  },
  {
    title: "Export PDF",
    description: "Rapport horodaté prêt à partager.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M12 18h4" />
        <path d="M8 14h8" />
        <path d="M8 10h4" />
      </svg>
    ),
  },
  {
    title: "Historique",
    description: "Suivez l’évolution de vos analyses.",
    icon: (
      <svg
        className="h-10 w-10 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 8v4l3 3" />
        <path d="M21 12a9 9 0 11-9-9" />
        <path d="M21 5v7h-7" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-16">
      <section className="container flex flex-col items-center py-12 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge className="mb-6 bg-primary/10 text-primary">Conformité publicitaire instantanée</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Analysez la <span className="text-primary">conformité</span> de vos publicités en 60 secondes
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Automatiser le contrôle de vos assets marketing n’a jamais été aussi simple. Déposez votre URL, et obtenez un rapport clair, actionnable et partageable.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Button href="/analyser" size="lg">
              Analyser une landing page
            </Button>
            <Button href="/historique" size="lg" variant="secondary">
              Voir un exemple de rapport
            </Button>
          </div>
        </div>
        <div className="mt-12 w-full max-w-5xl">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Dernière analyse
                </span>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-semibold text-primary">92</span>
                  <span className="mb-1 text-sm font-medium text-slate-500">/100</span>
                </div>
                <p className="text-sm text-slate-500">
                  Synthèse générée le 12 octobre 2024 — 3 recommandations à traiter pour atteindre la conformité totale.
                </p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                <div className="w-full max-w-xs space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-text">Claims juridiques</span>
                    <span className="text-sm font-semibold text-emerald-600">Conformes</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-text">Mentions obligatoires</span>
                    <span className="text-sm font-semibold text-amber-500">À revoir</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
                    <span className="text-sm font-medium text-text">Traçabilité</span>
                    <span className="text-sm font-semibold text-primary">Optimale</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-left">
              <div className="flex flex-col gap-4">
                {feature.icon}
                <div>
                  <h3 className="text-xl font-semibold text-text">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center text-sm text-slate-500 sm:flex-row sm:justify-center">
          <span className="font-medium text-slate-600">Déjà utilisé par</span>
          <div className="flex flex-wrap justify-center gap-3">
            {["E-commerce", "Agences", "Dropshipping"].map((label) => (
              <Badge key={label} className="bg-muted text-sm text-slate-600">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
