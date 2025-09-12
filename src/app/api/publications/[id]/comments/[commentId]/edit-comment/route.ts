import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { commentId } = await params;

  if (!commentId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  const { editCommentContent } = await req.json();

  try {
    const commentToUpdate = await prisma.publicationComments.update({
      where: {
        commentId,
      },
      data: {
        comment_content: editCommentContent,
      },
    });

    return NextResponse.json(commentToUpdate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while updating the post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { commentId } = await params;

  if (!commentId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const deletePost = await prisma.publicationComments.delete({
      where: { commentId },
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
