import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import { NextRequest } from "next/server";
import { Role, PublicationStatus } from "@/generated/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Authenticate the user and check their role
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Not logged in
    }

    // Check if the user is an EDITOR. Your schema defines 'role' as an array.
    if (authResult.user.role !== Role.EDITOR) {
      return NextResponse.json(
        {
          message:
            "Unauthorized: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }

    // 2. Get the publication ID from the URL and the new status from the body
    const { id } = params;
    const { status } = (await req.json()) as { status: PublicationStatus };

    // Validate the incoming status for this review endpoint
    if (
      status !== PublicationStatus.PUBLISHED &&
      status !== PublicationStatus.ARCHIVED
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid status provided. Must be 'PUBLISHED' or 'REJECTED'.",
        },
        { status: 400 }
      );
    }

    // 3. Use a transaction to update the publication and notify the author
    const archivePub = await prisma.$transaction(async (tx) => {
      // First, find the publication to get its authorId and title
      const publication = await tx.publication.findUnique({
        where: { pubId: id },
        select: { authorId: true, title: true },
      });

      if (!publication || !publication.authorId) {
        // Use a custom error to be caught by the catch block
        throw new Error("Publication not found or has no author.");
      }

      // STEP A: Update the publication's status
      const updatedPub = await tx.publication.update({
        where: { pubId: id },
        data: { status }, // Assign status directly for enum fields
      });

      // STEP B: Create a notification for the original author
      const notificationTitle = `Your Publication was ${
        status === "ARCHIVED" ? "Archived" : "Not Listed"
      }`;
      const notificationContent = `Your publication titled "${
        publication.title
      }" has been ${status.toLowerCase()}.`;

      await tx.notifications.create({
        data: {
          notifTitle: notificationTitle,
          notifContent: notificationContent,
          userId: publication.authorId, // Notify the original author
          pubNotifId: id, // Link notification back to the publication
        },
      });

      return updatedPub;
    });

    // 4. Return a success response
    return NextResponse.json(
      {
        message: `Publication successfully ${status.toLowerCase()}.`,
        publication: archivePub,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Publication update failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { message: "Something went wrong.", error: errorMessage },
      { status: 500 }
    );
  }
}
