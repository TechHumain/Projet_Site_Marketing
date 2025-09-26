"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../ui/button";
import { ConsentCategories, ConsentCookie } from "../../../types/consent";

const COOKIE_NAME = "pp_consent";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const COOKIE_MAX_AGE = ONE_DAY_IN_SECONDS * 365;

const DEFAULT_PREFERENCES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readConsentCookie(): ConsentCookie | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split(";") : [];

  for (const cookie of cookies) {
    const [rawName, ...rest] = cookie.trim().split("=");

    if (rawName === COOKIE_NAME) {
      try {
        const value = decodeURIComponent(rest.join("="));
        const parsed = JSON.parse(value) as ConsentCookie;

        if (
          parsed &&
          parsed.categories &&
          typeof parsed.categories.necessary === "boolean" &&
          typeof parsed.categories.analytics === "boolean" &&
          typeof parsed.categories.marketing === "boolean" &&
          typeof parsed.timestamp === "string"
        ) {
          return parsed;
        }
      } catch (error) {
        console.warn("Impossible de lire le cookie de consentement :", error);
      }
    }
  }

  return null;
}

function writeConsentCookie(value: ConsentCookie) {
  if (typeof document === "undefined") {
    return;
  }

  const serialized = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${COOKIE_NAME}=${serialized};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

async function sendConsentToServer(consent: ConsentCookie) {
  try {
    await fetch("/api/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

function useConsentPreferences() {
  const [preferences, setPreferences] = useState<ConsentCategories>(DEFAULT_PREFERENCES);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();

    if (stored) {
      setPreferences(mergePreferences(stored.categories));
      setHasStoredConsent(true);
    }

    setIsInitialized(true);
  }, []);

  const updatePreference = useCallback((key: keyof ConsentCategories, value: boolean) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: key === "necessary" ? true : value,
    }));
  }, []);

  const persistPreferences = useCallback((updated: ConsentCategories) => {
    const consent: ConsentCookie = {
      categories: mergePreferences(updated),
      timestamp: new Date().toISOString(),
    };

    writeConsentCookie(consent);
    void sendConsentToServer(consent);

    setPreferences(consent.categories);
    setHasStoredConsent(true);
  }, []);

  return {
    preferences,
    updatePreference,
    persistPreferences,
    isInitialized,
    hasStoredConsent,
  } as const;
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
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        disabled={disabled}
        aria-disabled={disabled}
        className="mt-1.5 h-5 w-5 shrink-0 rounded border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
      <label htmlFor={id} className="flex flex-col gap-1 text-left">
        <span className="font-semibold text-text">{label}</span>
        <span className="text-sm text-slate-500">{description}</span>
      </label>
    </div>
  );
}

export function CookieBanner() {
  const { preferences, updatePreference, persistPreferences, isInitialized, hasStoredConsent } =
    useConsentPreferences();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!hasStoredConsent) {
      setIsVisible(true);
    }
  }, [hasStoredConsent, isInitialized]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleOpen = () => {
      setIsExpanded(false);
      setIsVisible(true);
    };

    document.addEventListener("cookie-banner:open", handleOpen);

    return () => {
      document.removeEventListener("cookie-banner:open", handleOpen);
    };
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
      if (event.key === "Tab") {
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
      } else if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    first.focus();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus?.();
    };
  }, [focusableSelectors, isVisible]);

  const closeBanner = useCallback(
    (updatedPreferences: ConsentCategories) => {
      persistPreferences(updatedPreferences);
      setIsVisible(false);
    },
    [persistPreferences]
  );

  const handleAcceptAll = useCallback(() => {
    void closeBanner({ necessary: true, analytics: true, marketing: true });
  }, [closeBanner]);

  const handleRejectAll = useCallback(() => {
    void closeBanner({ necessary: true, analytics: false, marketing: false });
  }, [closeBanner]);

  const handleSavePreferences = useCallback(() => {
    void closeBanner(preferences);
  }, [closeBanner, preferences]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((previous) => !previous);
  }, []);

  if (!isInitialized || !isVisible) {
    return null;
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center sm:p-6"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        tabIndex={-1}
        className="flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-elevated focus:outline-none"
      >
        <div className="space-y-3">
          <h2 id="cookie-banner-title" className="text-2xl font-bold text-text">
            Gestion des cookies
          </h2>
          <p id="cookie-banner-description" className="text-base leading-relaxed text-slate-600">
            Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
            Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.
          </p>
        </div>

        {isExpanded ? (
          <fieldset
            aria-labelledby="cookie-preferences-legend"
            className="space-y-4 rounded-xl border border-border/70 bg-section-fade p-4"
          >
            <legend
              id="cookie-preferences-legend"
              className="px-1 text-base font-semibold text-text"
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
              onChange={(value) => updatePreference("analytics", value)}
            />
            <CheckboxOption
              id="cookie-marketing"
              label="Cookies marketing"
              description="Permettent de vous proposer des contenus et offres adaptés."
              checked={preferences.marketing}
              onChange={(value) => updatePreference("marketing", value)}
            />
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mt-2 w-full sm:w-auto"
              onClick={handleSavePreferences}
            >
              Enregistrer mes choix
            </Button>
          </fieldset>
        ) : null}

        <div className="space-y-3">
          <div className="space-y-3">
            <Button type="button" variant="primary" size="lg" className="w-full" onClick={handleAcceptAll}>
              Accepter tout
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full bg-slate-900 hover:bg-slate-900/90"
              onClick={handleRejectAll}
            >
              Refuser tout
            </Button>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full text-slate-700"
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Masquer les préférences" : "Personnaliser"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
