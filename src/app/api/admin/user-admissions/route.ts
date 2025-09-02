import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const users = await prisma.userAdmission.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        admission_id: true,
        user_email: true,
        firstName: true,
        lastName: true,
        password: true,
        profileImage: true,
        id_picture: true,
        bio: true,
        contactNumber: true,
        location: true,
        interests: true,
        role: true,
        status: true,
        createdAt: true,
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
