import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        profileImage: true,
        warningPoints: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            publications: true,
            forums: true,
          },
        },
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
