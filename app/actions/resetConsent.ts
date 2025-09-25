'use server';

import { cookies } from 'next/headers';
import { recordConsentEvent } from '@/lib/consentStore';
import type { ConsentCategories } from '@/types/consent';

const rejectedCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export async function resetConsentAction(): Promise<void> {
  const store = cookies();
  try {
    store.delete('pp_consent');
  } catch (error) {
    console.warn('Impossible de supprimer le cookie pp_consent', error);
  }
  await recordConsentEvent('REJECT', rejectedCategories);
}
