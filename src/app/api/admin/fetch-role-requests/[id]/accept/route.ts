import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Not logged in
    }

    const { id } = await params;

    const approveRoleChangeRequest = await prisma.$transaction(async (tx) => {
      // First, check if the admission exists and is still pending
      const existingRequest = await tx.changeUserRole.findUnique({
        where: { request_id: id },
        select: {
          userId: true,
          currentRole: true,
          requestedRole: true,
          status: true,
        },
      });

      if (!existingRequest) {
        throw new Error("Request not found");
      }

      if (existingRequest.status !== "PENDING") {
        throw new Error("Request is not in pending status");
      }

      const userId = existingRequest.userId;
      const requestedRole = existingRequest.requestedRole;

      const approvedUser = await tx.user.update({
        where: { id: userId },
        data: {
          role: requestedRole,
        },
      });

      const statusChange = await tx.changeUserRole.update({
        where: { request_id: id },
        data: {
          status: "APPROVED",
        },
      });

      return {
        user: approvedUser,
        status: statusChange,
        roleChangeRequest: existingRequest,
      };
    });

    return NextResponse.json({
      status: 200,
      message: "User role change approved successfully",
      data: approveRoleChangeRequest,
    });
  } catch (error: any) {
    console.error("Error in approving request:", error);

    // Return more specific error messages
    let errorMessage = "Something went wrong";
    if (error.message.includes("Request not found")) {
      errorMessage = "Request record not found";
    } else if (error.message.includes("not in pending status")) {
      errorMessage = "Request is not in pending status";
    } else if (error.message.includes("already exists")) {
      errorMessage = "User with this email already exists";
    } else if (error.code === "P2002") {
      errorMessage = "Unique constraint violation - user may already exist";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
