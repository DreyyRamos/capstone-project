import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import { NextRequest } from "next/server";
import { Role, PublicationStatus } from "@/generated/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate the user and check their role
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Not logged in
    }

    if (!([Role.EDITOR, Role.ADMIN] as Role[]).includes(authResult.user.role)) {
      return NextResponse.json(
        {
          message:
            "Unauthorized: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }
    // if (authResult.user.role !== Role.EDITOR) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "Unauthorized: You do not have permission to perform this action.",
    //     },
    //     { status: 403 }
    //   );
    // }

    // Get the publication ID from the URL and the new status from the body
    const { id } = await params;
    const { status } = (await req.json()) as { status: PublicationStatus };

    // Validate the incoming status for this review endpoint
    if (
      status !== PublicationStatus.PUBLISHED &&
      status !== PublicationStatus.REJECTED
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid status provided. Must be 'PUBLISHED' or 'REJECTED'.",
        },
        { status: 400 }
      );
    }

    // Use a transaction to update the publication and notify the author
    const rejectPub = await prisma.$transaction(async (tx) => {
      // First, find the publication to get its authorId and title
      const publication = await tx.publication.findUnique({
        where: { pubId: id },
        select: { authorId: true, title: true },
      });

      if (!publication || !publication.authorId) {
        // Use a custom error to be caught by the catch block
        throw new Error("Publication not found or has no author.");
      }

      // Update the publication's status
      const updatedPub = await tx.publication.update({
        where: { pubId: id },
        data: { status }, // Assign status directly for enum fields
      });

      // Create a notification for the original author
      const notificationTitle = `Your Publication was ${
        status === "REJECTED" ? "Rejected" : "Not Listed"
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
        publication: rejectPub,
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
