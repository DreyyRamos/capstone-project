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

    const { newRole } = await req.json();

    if (!newRole) {
      return NextResponse.json(
        { error: "newRole is required" },
        { status: 400 }
      );
    }
    const { id } = await params;
    // const resolvedParams = await params;
    // const id = resolvedParams.id;

    const changeUserRole = await prisma.$transaction(async (tx) => {
      // First, check if the admission exists and is still pending
      const existingUser = await tx.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          role: true,
          status: true,
        },
      });

      if (!existingUser) {
        throw new Error("Request not found");
      }

      //   if (existingRequest.status !== "PENDING") {
      //     throw new Error("Request is not in pending status");
      //   }

      //   let userId = existingRequest.userId;
      //   let requestedRole = existingRequest.requestedRole;

      const userToUpdate = await tx.user.update({
        where: { id: existingUser.id },
        data: {
          role: newRole,
        },
      });

      return {
        user: userToUpdate,
      };
    });

    return NextResponse.json({
      status: 200,
      message: "User role change approved successfully",
      data: changeUserRole,
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
