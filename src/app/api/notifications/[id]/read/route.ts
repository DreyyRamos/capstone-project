import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.notifications.update({
    where: { notifId: params.id },
    data: { isRead: true },
  });
  return NextResponse.json({ ok: true });
}
