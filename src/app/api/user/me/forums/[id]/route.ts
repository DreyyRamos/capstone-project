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

    const { id: userId } = authResult.user;

    const { topicTitle, description, category, tags } = await req.json();

    // Get the publication ID from the URL
    const { id } = await params;

    const updatedForum = await prisma.forum.update({
      where: { forumId: id },
      data: {
        topicTitle,
        description,
        category,
        tags,
      },
    });

    // 4. Return a success response
    return NextResponse.json(
      {
        message: "Forum successfully updated.",
        publication: updatedForum,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forum update failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { message: "Something went wrong.", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { id: forumId } = await params;

  if (!forumId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const deletePost = await prisma.forum.delete({
      where: { forumId: forumId },
    });
    return NextResponse.json(deletePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post." },
      { status: 500 }
    );
  }
}
