import { NextRequest, NextResponse } from 'next/server';

import { persistConsentEvent } from '../../../lib/consent/storage';
import { ConsentCategories, ConsentEvent } from '../../../types/consent';

function isValidCategories(categories: ConsentCategories): boolean {
  return (
    typeof categories.necessary === 'boolean' &&
    typeof categories.analytics === 'boolean' &&
    typeof categories.marketing === 'boolean'
  );
}

function extractUserId(request: NextRequest, payload: Partial<ConsentEvent>): string | null {
  const headerUserId = request.headers.get('x-user-id');
  const cookieUserId = request.cookies.get('userId')?.value;
  const payloadUserId = typeof payload.userId === 'string' ? payload.userId : null;

  return headerUserId ?? cookieUserId ?? payloadUserId ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<ConsentEvent> | null;

    if (!payload || typeof payload !== 'object' || !payload.categories) {
      return NextResponse.json(
        { error: 'Requête invalide : aucune préférence de consentement reçue.' },
        { status: 400 }
      );
    }

    const categories = payload.categories as ConsentCategories;

    if (!isValidCategories(categories)) {
      return NextResponse.json(
        { error: 'Requête invalide : catégories de consentement incorrectes.' },
        { status: 400 }
      );
    }

    if (categories.necessary !== true) {
      return NextResponse.json(
        { error: 'Le consentement pour les cookies nécessaires ne peut pas être désactivé.' },
        { status: 400 }
      );
    }

    const timestamp = typeof payload.timestamp === 'string' ? payload.timestamp : new Date().toISOString();
    const userId = extractUserId(request, payload);

    const event: ConsentEvent = {
      categories,
      timestamp,
      ...(userId ? { userId } : {}),
    };

    await persistConsentEvent(event);

    return NextResponse.json({ status: 'stored' });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du consentement :', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement du consentement." },
      { status: 500 }
    );
  }
}
