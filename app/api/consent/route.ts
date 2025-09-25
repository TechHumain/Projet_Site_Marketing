import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { ConsentCategories, ConsentStatus } from '@/types/consent';
import { recordConsentEvent } from '@/lib/consentStore';

function computeStatus(categories: ConsentCategories): ConsentStatus {
  const { analytics, marketing } = categories;
  if (analytics && marketing) {
    return 'ACCEPT';
  }
  if (!analytics && !marketing) {
    return 'REJECT';
  }
  return 'CUSTOM';
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as {
      categories: Partial<ConsentCategories> | undefined;
    };

    if (!payload?.categories) {
      return NextResponse.json({ error: 'Catégories manquantes' }, { status: 400 });
    }

    const categories: ConsentCategories = {
      necessary: true,
      analytics: Boolean(payload.categories.analytics),
      marketing: Boolean(payload.categories.marketing),
    };

    const status = computeStatus(categories);
    await recordConsentEvent(status, categories);

    const response = NextResponse.json({ status });
    response.cookies.set('pp_consent', JSON.stringify(categories), {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du consentement', error);
    return NextResponse.json(
      { error: 'Impossible de sauvegarder votre consentement' },
      { status: 500 },
    );
  }
}
