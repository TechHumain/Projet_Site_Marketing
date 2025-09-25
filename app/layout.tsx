import type { Metadata } from 'next';
import { CookieConsentProvider } from '@/components/CookieConsentProvider';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'PurePromo — Marketing intelligent',
  description:
    'Gérez vos préférences de cookies et accédez à votre compte client PurePromo.',
  metadataBase: new URL('https://purepromo.example'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          minHeight: '100vh',
        }}
      >
        <CookieConsentProvider>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <header
              style={{
                background: '#111827',
                color: '#f9fafb',
                padding: '2.5rem 1rem',
              }}
            >
              <div
                style={{
                  maxWidth: '960px',
                  margin: '0 auto',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                  PurePromo
                </div>
                <p style={{ margin: '0.5rem 0 0', maxWidth: '560px', lineHeight: 1.6 }}>
                  Des campagnes marketing à impact positif. Gérez vos données en toute
                  transparence.
                </p>
              </div>
            </header>
            <main
              style={{
                flex: 1,
                width: '100%',
              }}
            >
              {children}
            </main>
            <Footer />
          </div>
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
