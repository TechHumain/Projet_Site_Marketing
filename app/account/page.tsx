import ResetCookiesButton from './ResetCookiesButton';
import { getLatestConsentEvent } from '@/lib/consentStore';
import type { ConsentCategories } from '@/types/consent';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const latestDecision = await getLatestConsentEvent();

  return (
    <section
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '3rem 1rem 4rem',
        display: 'grid',
        gap: '2.5rem',
      }}
    >
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Mon compte</h1>
        <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
          Retrouvez ici un résumé de vos décisions de consentement ainsi que la
          possibilité de les réinitialiser à tout moment.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
        }}
      >
        <article
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.08)',
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          <header>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>
              Dernière décision enregistrée
            </h2>
            <p style={{ margin: 0, color: '#4b5563' }}>
              {latestDecision
                ? formatDate(latestDecision.createdAt)
                : 'Aucune décision enregistrée pour le moment.'}
            </p>
          </header>

          {latestDecision ? (
            <ConsentCategoriesList categories={latestDecision.categories} />
          ) : null}

          <ResetCookiesButton />
        </article>
      </div>
    </section>
  );
}

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch (error) {
    console.warn('Date de consentement invalide', error);
    return value;
  }
}

type ConsentCategoriesListProps = {
  categories: ConsentCategories;
};

function ConsentCategoriesList({ categories }: ConsentCategoriesListProps) {
  const descriptors: Array<{
    key: keyof ConsentCategories;
    label: string;
  }> = [
    { key: 'necessary', label: 'Cookies essentiels' },
    { key: 'analytics', label: 'Cookies analytiques' },
    { key: 'marketing', label: 'Cookies marketing' },
  ];

  return (
    <dl
      style={{
        display: 'grid',
        gap: '0.75rem',
        margin: 0,
      }}
    >
      {descriptors.map(({ key, label }) => (
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
          }}
        >
          <dt style={{ margin: 0, fontWeight: 600 }}>{label}</dt>
          <dd
            style={{
              margin: 0,
              color: categories[key] ? '#16a34a' : '#b91c1c',
              fontWeight: 600,
            }}
          >
            {categories[key] ? 'Activé' : 'Désactivé'}
          </dd>
        </div>
      ))}
    </dl>
  );
}
