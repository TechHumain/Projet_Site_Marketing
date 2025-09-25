import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  await prisma.user.delete({
    where: { id: session.user.id }
  });

  return NextResponse.json({ success: true });
}
