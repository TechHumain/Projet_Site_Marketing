export interface CaseStudy {
  name: string;
  logo: string;
  sector: string;
  kpi: string;
  testimonial: string;
}

export const caseStudies: CaseStudy[] = [
  {
    name: "Fintech Qonto",
    logo: "Qonto",
    sector: "Services financiers",
    kpi: "+42% de leads SQL en 90 jours",
    testimonial:
      "L'équipe a cadré des scénarios multicanaux qui ont enfin aligné marketing et sales sur nos comptes stratégiques.",
  },
  {
    name: "Retail éthique Loom",
    logo: "Loom",
    sector: "E-commerce",
    kpi: "-28% de coût d'acquisition",
    testimonial:
      "En six semaines, nous avons retrouvé un ROAS rentable et un pilotage clair pour réinvestir dans nos meilleures audiences.",
  },
  {
    name: "SaaS RH Alan",
    logo: "Alan",
    sector: "Scale-up",
    kpi: "+3 pts de taux de conversion trial",
    testimonial:
      "Leur lecture des parcours d'activation nous a permis de prioriser les quick wins CRM et d'accélérer notre expansion européenne.",
  },
  {
    name: "Industrie durable Ecov",
    logo: "Ecov",
    sector: "Mobilité",
    kpi: "+58% d'utilisation des lignes",
    testimonial:
      "La mission a structuré nos données et livré un plan d'actions concret qui a engagé les équipes terrain comme le COMEX.",
  },
];
