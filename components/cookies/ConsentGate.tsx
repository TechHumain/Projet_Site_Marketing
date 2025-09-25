'use client';

import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";

type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextValue = {
  /**
   * Current consent values. `null` means the user has not provided a choice yet.
   */
  consent: ConsentPreferences | null;
  /**
   * Whether the consent gate should currently be displayed to the user.
   */
  isGateOpen: boolean;
  /**
   * Whether the gate has finished reading the persisted preferences.
   */
  ready: boolean;
  /**
   * Persist consent choices and close the gate.
   */
  updateConsent: (value: ConsentPreferences) => void;
  /**
   * Re-open the gate and clear the stored consent.
   */
  relaunchGate: () => void;
  /**
   * Allow manually closing the gate without updating consent.
   */
  closeGate: () => void;
};

const COOKIE_NAME = "pp_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days.

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

const parseConsent = (raw: string | null): ConsentPreferences | null => {
  if (!raw) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(raw);
    const value = JSON.parse(decoded);

    if (
      typeof value === "object" &&
      value !== null &&
      typeof value.analytics === "boolean" &&
      typeof value.marketing === "boolean"
    ) {
      return { analytics: value.analytics, marketing: value.marketing };
    }
  } catch (error) {
    console.warn("Unable to parse pp_consent cookie", error);
  }

  return null;
};

const readConsentCookie = (): ConsentPreferences | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split(";") : [];
  const match = cookies
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

  if (!match) {
    return null;
  }

  const value = match.substring(COOKIE_NAME.length + 1);
  return parseConsent(value);
};

const writeConsentCookie = (value: ConsentPreferences) => {
  if (typeof document === "undefined") {
    return;
  }

  const serialized = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${COOKIE_NAME}=${serialized};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
};

const clearConsentCookie = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${COOKIE_NAME}=;path=/;max-age=0;SameSite=Lax`;
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const ConsentGate = ({ children }: PropsWithChildren) => {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);

  useEffect(() => {
    const existingConsent = readConsentCookie();

    if (existingConsent) {
      setConsent(existingConsent);
      setIsGateOpen(false);
    } else {
      setIsGateOpen(true);
    }

    setReady(true);
  }, []);

  const updateConsent = useCallback((value: ConsentPreferences) => {
    writeConsentCookie(value);
    setConsent(value);
    setIsGateOpen(false);
  }, []);

  const relaunchGate = useCallback(() => {
    clearConsentCookie();
    setConsent(null);
    setIsGateOpen(true);
  }, []);

  const closeGate = useCallback(() => {
    setIsGateOpen(false);
  }, []);

  const contextValue = useMemo<ConsentContextValue>(
    () => ({ consent, isGateOpen, ready, updateConsent, relaunchGate, closeGate }),
    [closeGate, consent, isGateOpen, ready, relaunchGate, updateConsent]
  );

  const gaId = GA_MEASUREMENT_ID ?? "";
  const gtmId = GTM_ID ?? "";
  const metaPixelId = META_PIXEL_ID ?? "";

  const shouldLoadAnalytics = Boolean(consent?.analytics && (gaId || gtmId));
  const shouldLoadMarketing = Boolean(consent?.marketing && metaPixelId);
  const useGA = Boolean(shouldLoadAnalytics && gaId);
  const useGTM = Boolean(shouldLoadAnalytics && !gaId && gtmId);

  return (
    <ConsentContext.Provider value={contextValue}>
      {useGA ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-tracking" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {useGTM ? (
        <>
          <Script id="gtm-loader" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      ) : null}

      {shouldLoadMarketing ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextValue => {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within a ConsentGate component");
  }

  return context;
};

export type { ConsentPreferences };
