import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const audits = [
  {
    title: "Audit Publicité",
    description:
      "Analysez instantanément vos créas publicitaires pour vérifier les claims, les mentions obligatoires et la conformité des visuels.",
    cta: "Lancer l’audit Pub",
    href: "/analyser?type=publicite",
  },
  {
    title: "Audit Landing Page",
    description:
      "Scannez vos pages de vente pour valider la conformité légale, le respect RGPD et la cohérence de l’expérience utilisateur.",
    cta: "Lancer l’audit Landing",
    href: "/analyser?type=landing",
  },
];

export default function AnalyserPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-6 bg-primary/10 text-primary">Audit express</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Choisissez votre audit marketing
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Sélectionnez le type d’analyse à lancer. Vous pourrez ensuite renseigner l’URL ciblée et suivre la génération du rapport détaillé.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {audits.map((audit) => (
          <Card key={audit.title} className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-text">{audit.title}</h2>
              <p className="text-sm text-slate-600">{audit.description}</p>
            </div>
            <div className="mt-8">
              <Button href={audit.href} className="w-full" size="md">
                {audit.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
