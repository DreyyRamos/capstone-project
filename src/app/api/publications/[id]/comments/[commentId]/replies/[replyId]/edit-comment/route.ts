import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { replyId } = await params;

  if (!replyId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  const { editReplyContent } = await req.json();

  try {
    const commentToUpdate = await prisma.publicationCommentReplies.update({
      where: {
        replyId,
      },
      data: {
        reply_content: editReplyContent,
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
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { replyId } = await params;

  if (!replyId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const deletePost = await prisma.publicationCommentReplies.delete({
      where: { replyId },
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
