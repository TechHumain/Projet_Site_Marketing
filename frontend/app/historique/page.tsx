import { Badge } from "../../components/ui/badge";

const tableHeaders = ["Date", "URL analysée", "Score global"];

export default function HistoriquePage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-6 bg-primary/10 text-primary">Historique</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Vos analyses récentes
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Retrouvez ici l’ensemble de vos audits. Exportez chaque rapport ou relancez un contrôle en un clic dès qu’une mise à jour est nécessaire.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-border/70">
          <thead className="bg-muted/60">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-sm text-slate-500">
                Votre historique apparaîtra ici dès qu’une première analyse aura été réalisée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
