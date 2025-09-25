'use client';

import Cookies from 'js-cookie';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ConsentCategories, ConsentStatus } from '@/types/consent';

type CookieConsentContextValue = {
  isBannerOpen: boolean;
  selection: ConsentCategories;
  openBanner: () => void;
  closeBanner: () => void;
  updateSelection: (next: ConsentCategories) => void;
  markConsentSaved: (next: ConsentCategories, status: ConsentStatus) => void;
  resetFromServer: () => void;
  lastStatus: ConsentStatus | null;
};

const defaultSelection: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined,
);

function inferStatus(categories: ConsentCategories): ConsentStatus {
  const { analytics, marketing } = categories;
  if (analytics && marketing) {
    return 'ACCEPT';
  }
  if (!analytics && !marketing) {
    return 'REJECT';
  }
  return 'CUSTOM';
}

function parseConsentCookie(): ConsentCategories | null {
  const raw = Cookies.get('pp_consent');
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentCategories>;
    return {
      ...defaultSelection,
      ...parsed,
      necessary: true,
    } satisfies ConsentCategories;
  } catch (error) {
    console.warn('Impossible de lire le cookie de consentement', error);
    return null;
  }
}

export function CookieConsentProvider({ children }: PropsWithChildren) {
  const [selection, setSelection] = useState<ConsentCategories>(defaultSelection);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [lastStatus, setLastStatus] = useState<ConsentStatus | null>(null);

  const syncWithCookie = useCallback(() => {
    const stored = parseConsentCookie();
    if (stored) {
      setSelection(stored);
      setLastStatus(inferStatus(stored));
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const hasStoredConsent = syncWithCookie();
    if (!hasStoredConsent) {
      setIsBannerOpen(true);
    }
  }, [syncWithCookie]);

  const openBanner = useCallback(() => {
    syncWithCookie();
    setIsBannerOpen(true);
  }, [syncWithCookie]);

  const closeBanner = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  const markConsentSaved = useCallback(
    (next: ConsentCategories, status: ConsentStatus) => {
      setSelection(next);
      setLastStatus(status);
      setIsBannerOpen(false);
    },
    [],
  );

  const resetFromServer = useCallback(() => {
    setSelection(defaultSelection);
    setLastStatus('REJECT');
    setIsBannerOpen(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      isBannerOpen,
      selection,
      openBanner,
      closeBanner,
      updateSelection: setSelection,
      markConsentSaved,
      resetFromServer,
      lastStatus,
    }),
    [closeBanner, isBannerOpen, markConsentSaved, openBanner, resetFromServer, selection, lastStatus],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      'useCookieConsent doit être utilisé à l’intérieur de CookieConsentProvider',
    );
  }
  return context;
}

export { defaultSelection as fallbackConsentSelection };
