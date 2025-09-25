import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function getPrismaInstance() {
  if (!process.env.DATABASE_URL) {
    return undefined;
  }

  if (global.prisma) {
    return global.prisma;
  }

  const client = new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    global.prisma = client;
  }

  return client;
}

export const prisma = getPrismaInstance();

export async function prismaHealthcheck(): Promise<{ ok: boolean; message?: string }> {
  if (!process.env.DATABASE_URL) {
    return { ok: false, message: "DATABASE_URL manquante" };
  }

  const client = prisma ?? getPrismaInstance();

  if (!client) {
    return { ok: false, message: "Impossible d’instancier Prisma" };
  }

  try {
    await client.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, message };
  }
}
