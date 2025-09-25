'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { ConsentCategories, ConsentCookie } from '../../types/consent';

const COOKIE_NAME = 'pp_consent';
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const COOKIE_MAX_AGE = ONE_DAY_IN_SECONDS * 365;

const DEFAULT_PREFERENCES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readConsentCookie(): ConsentCookie | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [rawName, ...rest] = cookie.trim().split('=');
    if (rawName === COOKIE_NAME) {
      try {
        const value = decodeURIComponent(rest.join('='));
        const parsed = JSON.parse(value) as ConsentCookie;

        if (
          parsed &&
          parsed.categories &&
          typeof parsed.categories.necessary === 'boolean' &&
          typeof parsed.categories.analytics === 'boolean' &&
          typeof parsed.categories.marketing === 'boolean' &&
          typeof parsed.timestamp === 'string'
        ) {
          return parsed;
        }
      } catch (error) {
        console.warn('Impossible de lire le cookie de consentement :', error);
      }
    }
  }

  return null;
}

function writeConsentCookie(value: ConsentCookie) {
  if (typeof document === 'undefined') {
    return;
  }

  const serialized = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${COOKIE_NAME}=${serialized};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

async function sendConsentToServer(consent: ConsentCookie) {
  try {
    await fetch('/api/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consent),
    });
  } catch (error) {
    console.error("Impossible d'envoyer le consentement au serveur :", error);
  }
}

function mergePreferences(preferences: ConsentCategories): ConsentCategories {
  return {
    ...DEFAULT_PREFERENCES,
    ...preferences,
    necessary: true,
  };
}

interface CheckboxOptionProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function CheckboxOption({ id, label, description, checked, onChange, disabled }: CheckboxOptionProps) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        aria-disabled={disabled}
        style={{ marginTop: '0.35rem' }}
      />
      <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.3 }}>{description}</span>
      </label>
    </div>
  );
}

export function CookieBanner() {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState<ConsentCategories>(DEFAULT_PREFERENCES);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const stored = readConsentCookie();

    if (stored) {
      setPreferences(mergePreferences(stored.categories));
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setIsReady(true);
  }, []);

  const focusableSelectors = useMemo(
    () =>
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(','),
    []
  );

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const node = dialogRef.current;

    if (!node) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;

    const focusable = Array.from(node.querySelectorAll<HTMLElement>(focusableSelectors));
    const first = focusable[0] ?? node;
    const last = focusable[focusable.length - 1] ?? node;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (focusable.length === 0) {
          event.preventDefault();
          node.focus();
          return;
        }

        if (event.shiftKey) {
          if (document.activeElement === first || document.activeElement === node) {
            event.preventDefault();
            (last ?? first).focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          (first ?? last).focus();
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
      }
    };

    first.focus();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus?.();
    };
  }, [focusableSelectors, isVisible]);

  const closeBanner = useCallback(
    (updatedPreferences: ConsentCategories) => {
      const consent: ConsentCookie = {
        categories: mergePreferences(updatedPreferences),
        timestamp: new Date().toISOString(),
      };

      writeConsentCookie(consent);
      void sendConsentToServer(consent);

      setPreferences(consent.categories);
      setIsVisible(false);
    },
    []
  );

  const handleAcceptAll = useCallback(() => {
    closeBanner({ necessary: true, analytics: true, marketing: true });
  }, [closeBanner]);

  const handleRejectAll = useCallback(() => {
    closeBanner({ necessary: true, analytics: false, marketing: false });
  }, [closeBanner]);

  const handleSavePreferences = useCallback(() => {
    closeBanner(preferences);
  }, [closeBanner, preferences]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((previous) => !previous);
  }, []);

  const updatePreference = useCallback((key: keyof ConsentCategories, value: boolean) => {
    setPreferences((previous) => ({ ...previous, [key]: key === 'necessary' ? true : value }));
  }, []);

  if (!isReady || !isVisible) {
    return null;
  }

  const buttonStyle: CSSProperties = {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(17, 24, 39, 0.55)',
        padding: '1.5rem',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        tabIndex={-1}
        style={{
          width: '100%',
          maxWidth: '32rem',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(30, 41, 59, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h2 id="cookie-banner-title" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Gestion des cookies
          </h2>
          <p id="cookie-banner-description" style={{ color: '#374151', lineHeight: 1.5 }}>
            Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
            Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.
          </p>
        </div>

        {isExpanded && (
          <fieldset
            aria-labelledby="cookie-preferences-legend"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <legend
              id="cookie-preferences-legend"
              style={{ fontWeight: 700, padding: '0 0.25rem', fontSize: '1rem' }}
            >
              Préférences de confidentialité
            </legend>
            <CheckboxOption
              id="cookie-necessary"
              label="Cookies nécessaires"
              description="Essentiels au fonctionnement du site et toujours activés."
              checked
              disabled
            />
            <CheckboxOption
              id="cookie-analytics"
              label="Cookies de mesure d'audience"
              description="Nous aident à comprendre comment notre site est utilisé."
              checked={preferences.analytics}
              onChange={(value) => updatePreference('analytics', value)}
            />
            <CheckboxOption
              id="cookie-marketing"
              label="Cookies marketing"
              description="Permettent de vous proposer des contenus et offres adaptés."
              checked={preferences.marketing}
              onChange={(value) => updatePreference('marketing', value)}
            />
            <button
              type="button"
              onClick={handleSavePreferences}
              style={{
                ...buttonStyle,
                alignSelf: 'flex-start',
                backgroundColor: '#10b981',
                color: '#ffffff',
                width: '100%',
              }}
            >
              Enregistrer mes choix
            </button>
          </fieldset>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleAcceptAll}
              style={{ ...buttonStyle, backgroundColor: '#2563eb', color: '#ffffff' }}
            >
              Accepter tout
            </button>
            <button
              type="button"
              onClick={handleRejectAll}
              style={{ ...buttonStyle, backgroundColor: '#111827', color: '#ffffff' }}
            >
              Refuser tout
            </button>
          </div>
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            style={{
              ...buttonStyle,
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
            }}
          >
            {isExpanded ? 'Masquer les préférences' : 'Personnaliser'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
