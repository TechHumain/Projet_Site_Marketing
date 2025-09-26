import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const metrics = [
  { value: "+37%", label: "de ROI moyen après 90 jours" },
  { value: "92%", label: "de clients renouvellent la mission" },
  { value: "4,9/5", label: "de satisfaction équipe et direction" },
];

const trustLogos = ["Alan", "BackMarket", "Qonto", "Mirakl", "Swile"];

const services = [
  {
    title: "Campagnes d'acquisition",
    description:
      "Audit de vos comptes ads, ciblages, créations et landing pages pour révéler les leviers de croissance rapides.",
    bullets: [
      "Analyse des plateformes payantes et mix média",
      "Refonte des audiences & segments prioritaires",
      "Optimisation des messages et visuels clés",
    ],
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
        <path d="M4 6h24v4H4z" />
        <path d="M4 14h16v4H4z" />
        <path d="M4 22h24v4H4z" />
      </svg>
    ),
  },
  {
    title: "Parcours & conversion",
    description:
      "Étude comportementale de vos tunnels, UX research et scoring des quick wins pour améliorer chaque étape.",
    bullets: [
      "Heatmaps, analytics & lecture des funnels",
      "CRO des landing pages et pages produit",
      "Backlog d'expérimentations priorisé",
    ],
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
        <path d="M4 8l12 8 12-8-12-6z" />
        <path d="M4 12v12l12 6V18z" />
        <path d="M28 12v12l-12 6V18z" />
      </svg>
    ),
  },
  {
    title: "CRM & fidélisation",
    description:
      "Cartographiez vos scénarios, segmentez vos bases et automatisez les messages à forte valeur pour chaque persona.",
    bullets: [
      "Diagnostic des scénarios transactionnels & relationnels",
      "Scoring clients, RFM et segments dynamiques",
      "Playbooks d'automations & contenus personnalisés",
    ],
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
        <path d="M6 6h20v20H6z" />
        <path d="M16 12v8" />
        <path d="M12 16h8" />
      </svg>
    ),
  },
];

const methodology = [
  {
    step: "01",
    title: "Kick-off & cadrage",
    subtitle: "Objectifs business & organisation",
    description:
      "Immersion dans votre contexte, récupération des accès et cadrage des KPI pour aligner toutes les parties prenantes.",
    deliverable: "Checklist des accès + feuille de route d'audit",
  },
  {
    step: "02",
    title: "Analyse 360°",
    subtitle: "Data, acquisition, CRM & conformité",
    description:
      "Audit croisé de vos comptes ads, analytics, CRM et assets créatifs avec scoring des opportunités par impact business.",
    deliverable: "Tableau de bord interactif + benchmark sectoriel",
  },
  {
    step: "03",
    title: "Restitution & activation",
    subtitle: "Priorisation & accompagnement",
    description:
      "Atelier de restitution auprès de vos équipes, co-construction du plan d'actions et accompagnement sur la mise en œuvre.",
    deliverable: "Roadmap priorisée sur 90 jours + coaching des équipes",
  },
];

const insights = [
  {
    eyebrow: "Acquisition",
    value: "+64%",
    description: "Augmentation moyenne du volume de leads qualifiés dès le premier trimestre.",
    bullets: [
      "Restructuration media buying multi-plateformes",
      "Création d'actifs créatifs testables en continu",
    ],
  },
  {
    eyebrow: "Conversion",
    value: "-32%",
    description: "Réduction constatée du coût d'acquisition client sur les parcours clés.",
    bullets: [
      "Expérimentations CRO priorisées par potentiel",
      "Optimisation du copywriting et des offres",
    ],
  },
  {
    eyebrow: "Fidélisation",
    value: "+48 pts",
    description: "Gain moyen de Customer Lifetime Value pour les comptes accompagnés.",
    bullets: [
      "Personnalisation des scénarios CRM & marketing automation",
      "Reporting prédictif sur mesure",
    ],
  },
];

const ctaBullets = [
  "Diagnostic gratuit de vos enjeux actuels",
  "Projection de gains personnalisée",
  "Accès à un plan d'action priorisé",
];

interface InsightCardProps {
  eyebrow: string;
  value: string;
  description: string;
  bullets: string[];
}

function InsightCard({ eyebrow, value, description, bullets }: InsightCardProps) {
  return (
    <Card className="h-full gap-4 rounded-2xl border-slate-200/60 bg-white/95 p-8 text-left shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <header className="flex items-baseline justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
        <strong className="text-3xl font-semibold text-primary">{value}</strong>
      </header>
      <p className="text-sm text-slate-600">{description}</p>
      <ul className="space-y-2 text-sm text-slate-600">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function EnablementHighlight() {
  return (
    <div className="grid gap-6 rounded-[28px] border border-white/30 bg-gradient-to-tr from-indigo-500/95 via-indigo-600/95 to-indigo-700/95 px-10 py-12 text-slate-100 shadow-[0_32px_70px_rgba(79,70,229,0.25)]">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Enablement
        </span>
        <h2 className="text-3xl font-semibold leading-tight text-white md:text-[2.4rem]">
          Un accompagnement pensé pour vos équipes
        </h2>
        <p className="max-w-2xl text-base text-slate-200/85">
          Des livrables synthétiques, des recommandations priorisées et des ateliers opérationnels pour accélérer votre passage à l'action.
        </p>
      </div>
      <ul className="space-y-3 text-sm text-slate-100/90">
        <li>Tableaux de bord prêts à l'emploi</li>
        <li>Templates de campagnes &amp; automations</li>
        <li>Suivi mensuel sur mesure</li>
      </ul>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="grid gap-6 rounded-[28px] border border-slate-800/60 bg-slate-900/80 p-8 shadow-[0_32px_70px_rgba(15,23,42,0.35)] backdrop-blur md:p-10 lg:grid-cols-[1fr_minmax(0,1.05fr)]">
      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-100 md:p-7">
        <p className="text-sm text-slate-100/90">
          Écrivez-nous à <a href="mailto:contact@audit-marketing.fr" className="font-semibold text-white underline">contact@audit-marketing.fr</a> ou choisissez un créneau dans notre agenda partagé. Nous revenons vers vous sous 24h ouvrées.
        </p>
        <ul className="space-y-2 text-sm text-slate-100/85">
          {ctaBullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <form
        className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-left md:p-7"
        action="https://formspree.io/f/mwkjakdl"
        method="post"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="cta-field">
            Nom et prénom
            <input className="cta-input" type="text" name="name" autoComplete="name" required />
          </label>
          <label className="cta-field">
            Email professionnel
            <input className="cta-input" type="email" name="email" autoComplete="email" required />
          </label>
          <label className="cta-field">
            Entreprise
            <input className="cta-input" type="text" name="company" autoComplete="organization" />
          </label>
          <label className="cta-field">
            Objectif principal
            <select className="cta-input" name="goal" required defaultValue="">
              <option value="" disabled>
                Choisissez un objectif
              </option>
              <option value="acquisition">Accélérer l'acquisition</option>
              <option value="conversion">Optimiser la conversion</option>
              <option value="fidelisation">Renforcer la fidélisation</option>
              <option value="data">Structurer la data</option>
            </select>
          </label>
        </div>
        <label className="cta-field">
          Décrivez vos enjeux
          <textarea
            className="cta-input min-h-[9.5rem]"
            name="context"
            rows={4}
            placeholder="Parlez-nous de vos objectifs et des défis actuels"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" className="w-full shadow-[0_24px_45px_rgba(15,23,42,0.3)] sm:w-auto">
            Réserver un créneau
          </Button>
          <p className="cta-note">Aucun engagement. Nous revenons vers vous sous 24h ouvrées.</p>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-hero-radial" aria-hidden="true" />
        <div className="container relative flex flex-col items-center gap-16 py-24 text-center">
          <div className="flex max-w-4xl flex-col items-center gap-6">
            <Badge className="bg-primary/10 text-primary">Audit marketing premium</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Identifiez vos leviers de croissance en moins de 7 jours
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              Nos experts data, acquisition et CRM analysent l'intégralité de votre expérience client pour révéler les actions
              à plus fort impact. Vous repartez avec une feuille de route priorisée, prête à activer par vos équipes.
            </p>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center">
              <Button href="/analyser" size="lg" className="w-full sm:w-auto">
                Demander un audit personnalisé
              </Button>
              <Button
                href="/historique"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Découvrir un rapport type
              </Button>
            </div>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label} className="bg-white/80 text-left">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-semibold text-primary">{metric.value}</span>
                  <p className="text-sm text-slate-600">{metric.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container" aria-label="Références clients">
        <div className="flex flex-col gap-6 rounded-3xl border border-border/70 bg-white/90 px-8 py-10 shadow-sm backdrop-blur">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
              Ils nous font confiance
            </span>
            <p className="text-sm text-slate-500">+120 projets accompagnés sur les 24 derniers mois</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg font-medium text-slate-600">
            {trustLogos.map((logo) => (
              <span key={logo} className="text-slate-500">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="container space-y-12">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="self-center bg-accent/15 text-primary">Expertises</Badge>
          <h2 className="text-3xl font-semibold text-text">Ce que nous analysons</h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            Une vision panoramique de vos performances marketing pour orchestrer des campagnes efficaces, rentables et
            cohérentes sur l’ensemble du parcours client.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col gap-6 text-left">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                {service.icon}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-text">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
              <ul className="mt-auto space-y-2 text-sm text-slate-600">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section id="methodologie" className="container space-y-12">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="self-center bg-primary/10 text-primary">Méthodologie</Badge>
          <h2 className="text-3xl font-semibold text-text">Un accompagnement senior de bout en bout</h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            De l’immersion initiale à l’activation, nous orchestrons chaque étape pour accélérer vos décisions et sécuriser la
            conformité de vos campagnes.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {methodology.map((step) => (
            <Card key={step.step} className="flex h-full flex-col gap-5 text-left">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Étape {step.step}
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                <p className="text-sm font-medium text-primary/80">{step.subtitle}</p>
              </div>
              <p className="text-sm text-slate-600">{step.description}</p>
              <div className="mt-auto rounded-2xl bg-muted/80 px-4 py-3 text-xs font-medium text-slate-600">
                Livrable : {step.deliverable}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container space-y-12">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="self-center bg-primary/10 text-primary">Résultats</Badge>
          <h2 className="text-3xl font-semibold text-text">Des résultats mesurables dès les premières semaines</h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            Nous combinons l'analyse data, l'intelligence marché et l'opérationnel pour accélérer durablement votre acquisition
            et la fidélisation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.eyebrow} {...insight} />
          ))}
        </div>
      </section>

      <section className="container">
        <EnablementHighlight />
      </section>

      <section id="contact" className="container space-y-12">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="self-center bg-primary/10 text-primary">Contact</Badge>
          <h2 className="text-3xl font-semibold text-text">Parlons de votre prochaine étape</h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            Programmez un échange de 30 minutes avec un consultant senior pour identifier comment l'audit peut soutenir vos
            objectifs de croissance.
          </p>
        </div>
        <ContactPanel />
      </section>
    </div>
  );
}
