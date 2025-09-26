import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";

const plans = [
  {
    name: "Starter",
    price: "49€",
    period: "par mois",
    description: "Idéal pour tester la conformité de vos campagnes ponctuelles.",
    features: [
      "5 audits landing ou publicités inclus",
      "Exports PDF illimités",
      "Support email sous 48h",
    ],
  },
  {
    name: "Pro",
    price: "129€",
    period: "par mois",
    description: "Pour les équipes marketing qui lancent des campagnes chaque semaine.",
    features: [
      "25 audits mensuels",
      "Historique détaillé et comparaisons",
      "Alertes conformité en temps réel",
    ],
    featured: true,
  },
  {
    name: "Agency",
    price: "249€",
    period: "par mois",
    description: "Pensé pour les agences et réseaux multi-marques exigeants.",
    features: [
      "Audits illimités",
      "Exports marque blanche",
      "Gestion multi-comptes et accès clients",
    ],
  },
];

export default function TarifsPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-6 bg-primary/10 text-primary">Tarifs</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Choisissez le plan qui vous correspond
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Des formules claires pour garantir la conformité de vos publicités, quelle que soit la taille de votre équipe.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex h-full flex-col p-8 text-left",
              plan.featured && "border-primary/70 shadow-md shadow-primary/10",
            )}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-text">{plan.name}</h2>
                {plan.featured ? (
                  <Badge className="bg-primary text-primary-foreground text-xs uppercase tracking-wide">
                    Populaire
                  </Badge>
                ) : null}
              </div>
              <p className="text-sm text-slate-600">{plan.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-text">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <svg
                    className="mt-1 h-4 w-4 flex-shrink-0 text-primary"
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
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/analyser" size="md" className="w-full" variant={plan.featured ? "primary" : "secondary"}>
                Démarrer avec {plan.name}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
