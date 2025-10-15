import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const roleRequests = await prisma.changeUserRole.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        request_id: true,
        firstName: true,
        lastName: true,
        email: true,
        profileImage: true,
        currentRole: true,
        requestedRole: true,
        reason: true,
        additionalInformation: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            _count: {
              select: {
                publications: true,
                forums: true,
              },
            },
            warningPoints: true,
            status: true,
            reputationPoints: true,
          },
        },
      },
    });

    return NextResponse.json({ status: 200, roleRequests });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { message: "Failed to fetch reports." },
      { status: 500 }
    );
  }
}
