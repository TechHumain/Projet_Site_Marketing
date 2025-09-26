import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const features = [
  {
    title: "Score Global",
    description: "Note instantanée avec indicateurs visuels.",
    icon: (
      <svg
        className="h-8 w-8 text-primary"
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
        className="h-8 w-8 text-primary"
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
        className="h-8 w-8 text-primary"
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
    <div className="pb-20">
      <section className="container flex flex-col items-center py-16 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <Badge className="bg-primary/10 text-primary">Conformité publicitaire instantanée</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Analysez la conformité de vos <span className="text-primary">publicités</span> en 60 secondes
          </h1>
          <p className="text-lg text-slate-600">
            Automatisez le contrôle de vos assets marketing : uploadez votre landing page, recevez un rapport clair, actionnable et prêt à partager.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Button href="/analyser" size="lg" className="w-full sm:w-auto">
              Analyser une landing page
            </Button>
            <Button
              href="/historique"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Voir un exemple de rapport
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
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
          <span className="font-medium text-slate-600">Déjà utilisé par…</span>
          <div className="flex flex-wrap justify-center gap-3">
            {["E-commerce", "Agences", "Dropshipping"].map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
