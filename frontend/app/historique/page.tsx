import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { caseStudies } from "../../data/case-studies";

const clientLogos = ["Alan", "Back Market", "Qonto", "Mirakl", "Swile"];

export default function CaseStudiesPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-6 bg-primary/10 text-primary">Cas clients</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Nos cas clients
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Des scale-up aux ETI, nous accompagnons les équipes marketing et growth qui veulent des résultats mesurables. Voici des missions récentes qui illustrent notre méthodologie basée sur les preuves et l'impact business.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:mt-16 xl:grid-cols-3">
        {caseStudies.map((study) => (
          <Card
            key={study.name}
            className="flex h-full flex-col gap-6 rounded-3xl border-slate-200/70 bg-white p-8 shadow-lg"
          >
            <header className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                {study.logo}
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                {study.sector}
              </span>
            </header>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Résultat clé</p>
              <p className="text-2xl font-semibold text-primary sm:text-3xl">{study.kpi}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-500">{study.name}</p>
              <blockquote className="text-sm leading-relaxed text-slate-600">
                “{study.testimonial}”
              </blockquote>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-16 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-slate-50 shadow-xl sm:p-14">
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-center">
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                Prêts à tester ?
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Analysez votre funnel et obtenez votre plan d'actions priorisé
              </h2>
            </div>
            <p className="text-base text-slate-200">
              Nos experts réalisent un diagnostic express de vos parcours, livrent vos quick wins et vous accompagnent sur l'exécution.
            </p>
            <Button href="/analyser" size="lg" className="w-full sm:w-auto">
              Lancer mon analyse
            </Button>
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400/80">
              Ils nous font confiance
            </p>
            <div className="grid grid-cols-2 gap-4 text-center text-sm font-medium text-slate-200 sm:grid-cols-3">
              {clientLogos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
