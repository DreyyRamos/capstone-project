import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, ["ADMIN", "MODERATOR"]);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const users = await prisma.user.findMany({
      orderBy: { warningPoints: "desc" },
      where: { warningPoints: { gte: 1 } },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        profileImage: true,
        warningPoints: true,
        status: true,
        reportsAgainst: true,
      },
    });

    return NextResponse.json({ status: 200, users });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { message: "Failed to fetch reports." },
      { status: 500 }
    );
  }
}
