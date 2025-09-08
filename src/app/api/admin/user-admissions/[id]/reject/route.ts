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

    // const resolvedParams = await params;
    // const id = resolvedParams.id;

    const updatedAdmission = await prisma.userAdmission.update({
      where: { admission_id: id },
      data: {
        status: "REJECTED",
      },
    });

    return NextResponse.json({
      status: 200,
      message: "User admission rejected",
      data: updatedAdmission,
    });
  } catch (error: any) {
    console.error("Error in approve admission:", error);

    // Return more specific error messages
    let errorMessage = "Something went wrong";
    if (error.message.includes("Admission not found")) {
      errorMessage = "Admission record not found";
    } else if (error.message.includes("not in pending status")) {
      errorMessage = "Admission is not in pending status";
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
