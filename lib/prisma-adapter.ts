import type { Adapter, AdapterAccount } from "next-auth/adapters";
import type { PrismaClient } from "@prisma/client";

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(data) {
      return prisma.user.create({
        data
      });
    },
    async getUser(id) {
      return prisma.user.findUnique({
        where: { id }
      });
    },
    async getUserByEmail(email) {
      return prisma.user.findUnique({
        where: { email }
      });
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: true }
      });
      return account?.user ?? null;
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("User id is required to update user");
      }
      return prisma.user.update({
        where: { id: data.id },
        data
      });
    },
    async deleteUser(id) {
      return prisma.user.delete({
        where: { id }
      });
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: account as AdapterAccount
      });
      return account;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      return prisma.account.delete({
        where: { provider_providerAccountId: { provider, providerAccountId } }
      });
    },
    async createSession(data) {
      return prisma.session.create({
        data
      });
    },
    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true }
      });
      if (!session) return null;
      const { user, ...sessionData } = session;
      return { session: sessionData, user };
    },
    async updateSession(data) {
      return prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data
      });
    },
    async deleteSession(sessionToken) {
      return prisma.session.delete({
        where: { sessionToken }
      });
    },
    async createVerificationToken(data) {
      return prisma.verificationToken.create({
        data
      });
    },
    async useVerificationToken({ identifier, token }) {
      try {
        return await prisma.verificationToken.delete({
          where: { identifier_token: { identifier, token } }
        });
      } catch (error) {
        return null;
      }
    }
  };
}
