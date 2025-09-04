import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../(middlware)/authMiddleware";
import prisma from "@/lib/prisma"; // Assuming prisma client path

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const {
      userId,
      firstName,
      lastName,
      profileImage,
      userEmail,
      currentRole,
      requestedRole,
      reason,
      additionalInfo,
    } = await req.json();

    const roleChange = await prisma.changeUserRole.create({
      data: {
        userId,
        firstName,
        lastName,
        profileImage,
        email: userEmail,
        currentRole,
        requestedRole,
        reason,
        additionalInformation: additionalInfo,
      },
    });

    return NextResponse.json({ changeRole: roleChange }, { status: 201 });
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      { message: "Failed to create publication and notify users." },
      { status: 500 }
    );
  }
}
