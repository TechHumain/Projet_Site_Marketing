'use client';

import { useCookieConsent } from './CookieConsentProvider';

export default function Footer() {
  const { openBanner, lastStatus } = useCookieConsent();

  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid #e5e7eb',
        background: '#fff',
        padding: '1.5rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: '#6b7280' }}>
          © {new Date().getFullYear()} PurePromo. Tous droits réservés.
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {lastStatus ? (
            <span style={{ color: '#4b5563', fontSize: '0.9rem' }}>
              Dernière action : {renderStatusLabel(lastStatus)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={openBanner}
            style={{
              borderRadius: '999px',
              border: '1px solid #2563eb',
              background: '#eff6ff',
              color: '#1d4ed8',
              padding: '0.65rem 1.5rem',
              fontWeight: 600,
            }}
          >
            Gérer mes cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

function renderStatusLabel(status: string): string {
  switch (status) {
    case 'ACCEPT':
      return 'Tout accepté';
    case 'REJECT':
      return 'Tout refusé';
    case 'CUSTOM':
      return 'Préférences personnalisées';
    default:
      return status;
  }
}
