'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import type { ConsentStatus } from '@/types/consent';
import { useCookieConsent } from './CookieConsentProvider';

type BannerError = string | null;

type ConsentResponse = {
  status: ConsentStatus;
};

async function persistConsent(consent: {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}): Promise<ConsentResponse> {
  const response = await fetch('/api/consent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categories: consent }),
  });

  if (!response.ok) {
    throw new Error('Réponse réseau inattendue');
  }

  const payload = (await response.json()) as ConsentResponse;
  return payload;
}

export default function CookieBanner() {
  const {
    isBannerOpen,
    selection,
    updateSelection,
    markConsentSaved,
    closeBanner,
  } = useCookieConsent();
  const [error, setError] = useState<BannerError>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!isBannerOpen) {
    return null;
  }

  const handlePersist = async (
    overrides: Partial<typeof selection> | null,
  ) => {
    try {
      setIsSaving(true);
      setError(null);
      const nextSelection = {
        ...selection,
        ...overrides,
        necessary: true,
      };
      const { status } = await persistConsent(nextSelection);
      markConsentSaved(nextSelection, status);
    } catch (err) {
      setError('Nous ne parvenons pas à sauvegarder vos préférences.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.45)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '2rem 1rem',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          background: '#fff',
          color: '#111827',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
          padding: '2rem',
          display: 'grid',
          gap: '1.5rem',
        }}
      >
        <div>
          <div
            id="cookie-banner-title"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            Vos préférences de cookies
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Nous utilisons des cookies pour assurer le bon fonctionnement du site,
            mesurer son audience et personnaliser nos contenus marketing. Ajustez
            vos préférences par catégorie ou acceptez/rejetez tout.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          <CategoryCard
            title="Cookies essentiels"
            description="Indispensables au fonctionnement du site. Ils sont toujours actifs."
            checked
            disabled
          />

          <CategoryCard
            title="Cookies analytiques"
            description="Nous aident à comprendre comment le site est utilisé afin d'améliorer l'expérience."
            checked={selection.analytics}
            onToggle={(value) =>
              updateSelection({ ...selection, analytics: value })
            }
          />

          <CategoryCard
            title="Cookies marketing"
            description="Servent à personnaliser nos offres et communications."
            checked={selection.marketing}
            onToggle={(value) =>
              updateSelection({ ...selection, marketing: value })
            }
          />
        </div>

        {error ? (
          <div
            role="status"
            style={{
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
            }}
          >
            {error}
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={() => handlePersist({ analytics: false, marketing: false })}
            disabled={isSaving}
            style={buttonStyle.secondary}
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={() => handlePersist({ analytics: true, marketing: true })}
            disabled={isSaving}
            style={buttonStyle.secondary}
          >
            Tout accepter
          </button>
          <button
            type="button"
            onClick={() => handlePersist(null)}
            disabled={isSaving}
            style={buttonStyle.primary}
          >
            Enregistrer mes choix
          </button>
          <button
            type="button"
            onClick={closeBanner}
            style={buttonStyle.link}
          >
            Continuer sans modifier
          </button>
        </div>
      </div>
    </div>
  );
}

type CategoryCardProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: (value: boolean) => void;
};

function CategoryCard({
  title,
  description,
  checked,
  disabled = false,
  onToggle,
}: CategoryCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 600,
            marginBottom: '0.35rem',
          }}
        >
          {title}
        </div>
        <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.5 }}>{description}</p>
      </div>
      <label
        style={{
          position: 'relative',
          display: 'inline-flex',
          width: '3.25rem',
          height: '1.75rem',
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onToggle?.(event.target.checked)}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        <span
          aria-hidden
          style={{
            flex: 1,
            backgroundColor: disabled
              ? '#d1d5db'
              : checked
              ? '#2563eb'
              : '#d1d5db',
            borderRadius: '999px',
            position: 'relative',
            transition: 'background-color 0.2s ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '0.15rem',
              left: checked ? '1.7rem' : '0.2rem',
              width: '1.45rem',
              height: '1.45rem',
              borderRadius: '50%',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
              transition: 'left 0.2s ease',
            }}
          />
        </span>
      </label>
    </div>
  );
}

const buttonStyle = {
  primary: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '999px',
    padding: '0.75rem 1.75rem',
    fontWeight: 600,
  },
  secondary: {
    background: '#eff6ff',
    color: '#1d4ed8',
    border: 'none',
    borderRadius: '999px',
    padding: '0.75rem 1.75rem',
    fontWeight: 600,
  },
  link: {
    background: 'transparent',
    color: '#4b5563',
    border: 'none',
    textDecoration: 'underline',
    padding: '0.75rem 1rem',
  },
} satisfies Record<string, CSSProperties>;
