// app/api/check-warning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";
import { UserStatus } from "@/generated/prisma";

function computeStatus(points: number): UserStatus {
  if (points >= 10) return UserStatus.BANNED;
  if (points >= 5) return UserStatus.SUSPENDED;
  if (points >= 3) return UserStatus.WARNED;
  return UserStatus.ACTIVE;
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;

    const { userId } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newStatus = computeStatus(user.warningPoints);
    let updatedUser = user;

    if (user.status !== newStatus) {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status: newStatus },
      });
    }

    return NextResponse.json(
      { user: updatedUser, statusChanged: user.status !== newStatus },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to check warnings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
