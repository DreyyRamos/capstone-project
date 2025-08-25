import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: moderatorId } = authResult.user;

    const { reportId } = await request.json();

    if (!reportId) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    // Update report as resolved regardless of whether content existed
    await prisma.reports.update({
      where: { reportId },
      data: {
        status: "RESTORED",
        actionTaken: "Content is restored.",
        moderatorNotes:
          "The content was reviewed and didn't violate guidelines or community standards.",
        resolvedAt: new Date(),
        reviewedBy: {
          connect: { id: moderatorId },
        },
      },
    });

    return NextResponse.json({
      success: true,
      //   message: deletionMessage,
      //   wasAlreadyDeleted: !contentExists,
    });
  } catch (error: any) {
    console.error("Resolve error:", error);

    // Handle specific Prisma errors
    // if (error.code === "P2025") {
    //   // Record not found error
    //   return NextResponse.json({
    //     success: true,
    //     message: "Content was already deleted",
    //     wasAlreadyDeleted: true,
    //   });
    //}

    return NextResponse.json(
      { error: "Failed to restore content" },
      { status: 500 }
    );
  }
}
