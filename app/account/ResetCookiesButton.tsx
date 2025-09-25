'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { resetConsentAction } from '@/app/actions/resetConsent';
import { useCookieConsent } from '@/components/CookieConsentProvider';

export default function ResetCookiesButton() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter();
  const { resetFromServer } = useCookieConsent();

  const handleClick = () => {
    startTransition(async () => {
      await resetConsentAction();
      resetFromServer();
      setFeedback('Vos préférences seront redemandées lors de votre prochaine visite.');
      router.refresh();
    });
  };

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        style={{
          borderRadius: '12px',
          border: '1px solid #2563eb',
          background: isPending ? '#c7d2fe' : '#eff6ff',
          color: '#1d4ed8',
          padding: '0.75rem 1.25rem',
          fontWeight: 600,
        }}
      >
        {isPending ? 'Réinitialisation…' : 'Réinitialiser mes cookies'}
      </button>
      {feedback ? (
        <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>{feedback}</p>
      ) : null}
    </div>
  );
}
