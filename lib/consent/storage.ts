import { promises as fs } from 'fs';
import path from 'path';

import { ConsentEvent } from '../../types/consent';

const CONSENT_EVENTS_FILE = path.join(process.cwd(), 'data', 'consent-events.json');

async function readExistingEvents(): Promise<ConsentEvent[]> {
  try {
    const raw = await fs.readFile(CONSENT_EVENTS_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed as ConsentEvent[];
    }

    return [];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

export async function persistConsentEvent(event: ConsentEvent): Promise<void> {
  const directory = path.dirname(CONSENT_EVENTS_FILE);
  await fs.mkdir(directory, { recursive: true });

  const events = await readExistingEvents();
  events.push(event);

  await fs.writeFile(CONSENT_EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
}
