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
    // 1. Authenticate the user and check their role
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Not logged in
    }

    const { id: editorId, firstName, lastName } = authResult.user;

    const { title, excerpt, content, imageUrl, tags, category, isFeatured } =
      await req.json();

    // Check if the user is an EDITOR
    if (authResult.user.role !== Role.EDITOR) {
      return NextResponse.json(
        {
          message:
            "Unauthorized: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }

    // 2. Get the publication ID from the URL
    const { id } = await params;

    // 3. Use a transaction to update the publication and notify the author
    const updatedPublication = await prisma.$transaction(async (tx) => {
      // First, find the publication to get its authorId and title
      const publication = await tx.publication.findUnique({
        where: { pubId: id },
        select: {
          authorId: true,
          title: true,
          author: {
            select: {
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      });

      if (!publication || !publication.authorId) {
        throw new Error("Publication not found or has no author.");
      }

      // STEP A: Update the publication and track who updated it
      const updatedPub = await tx.publication.update({
        where: { pubId: id },
        data: {
          title,
          excerpt,
          content,
          imageUrl,
          tags,
          category,
          isFeatured,
          updatedById: editorId, // Track who made the update
        },
      });

      // Create editor's full name for notification
      const editorName =
        `${firstName || ""} ${lastName || ""}`.trim() || "An editor";

      // Create notification for the original author
      const notificationContent = `Your publication titled "${publication.title}" has been edited by ${editorName}.`;

      await tx.notifications.create({
        data: {
          notifTitle: `Your publication was edited by ${editorName}`,
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
        message: "Publication successfully updated.",
        publication: updatedPublication,
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

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const authResult = await authMiddleware(req);
//   if (authResult instanceof NextResponse) return authResult;
//   const { user } = authResult;

//   const resolvedParams = await params;
//   const pubId = resolvedParams.id;

//   if (!pubId) {
//     return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
//   }
//   //   const { title, content, imageUrl } = await req.json();

//   try {
//     const updatePost = await prisma.publication.update({
//       where: {
//         pubId: pubId,
//       },
//       data: {
//         // title,
//         // content,
//         // imageUrl,
//         status: "PUBLISHED",
//       },
//     });

//     console.log(updatePost);
//     return NextResponse.json(updatePost);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "An error occurred while updating the post." },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { id: pubId } = await params;

  if (!pubId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const deletePost = await prisma.publication.delete({
      where: { pubId: pubId },
    });

    console.log("post deleted");
    return NextResponse.json(deletePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post." },
      { status: 500 }
    );
  }
}
