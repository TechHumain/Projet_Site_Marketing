import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { ConsentCategories, ConsentStatus } from '@/types/consent';

export type ConsentEvent = {
  id: string;
  status: ConsentStatus;
  categories: ConsentCategories;
  createdAt: string;
};

const dataDirectory = path.join(process.cwd(), 'data');
const eventsFilePath = path.join(dataDirectory, 'consent-events.json');

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDirectory, { recursive: true });
  try {
    await fs.access(eventsFilePath);
  } catch {
    await fs.writeFile(eventsFilePath, '[]', 'utf-8');
  }
}

export async function getConsentEvents(): Promise<ConsentEvent[]> {
  await ensureStore();
  const raw = await fs.readFile(eventsFilePath, 'utf-8');
  try {
    const parsed = JSON.parse(raw) as ConsentEvent[];
    return parsed;
  } catch (error) {
    console.warn('Impossible de parser le journal de consentement, réinitialisation', error);
    await fs.writeFile(eventsFilePath, '[]', 'utf-8');
    return [];
  }
}

export async function getLatestConsentEvent(): Promise<ConsentEvent | null> {
  const events = await getConsentEvents();
  if (events.length === 0) {
    return null;
  }
  return events[events.length - 1];
}

export async function recordConsentEvent(
  status: ConsentStatus,
  categories: ConsentCategories,
): Promise<ConsentEvent> {
  const events = await getConsentEvents();
  const entry: ConsentEvent = {
    id: randomUUID(),
    status,
    categories,
    createdAt: new Date().toISOString(),
  };
  events.push(entry);
  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
  return entry;
}
