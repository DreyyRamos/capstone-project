import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string; // forumId
      commentId: string; // commentId
      replyId: string; // parentReplyId
      childId: string; // replyToReplyId
    }>;
  }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const {
    id: forumId,
    commentId,
    replyId: parentReplyId,
    childId: replyToReplyId,
  } = await params;

  try {
    // Check if the user has already liked this reply-to-reply
    const existingLike = await prisma.forumCommentReplyToReplyLikes.findFirst({
      where: {
        replyToReplyId,
        userId: user.id,
      },
    });

    if (existingLike) {
      // Toggle the like status
      const updatedLike = await prisma.forumCommentReplyToReplyLikes.update({
        where: {
          commentReplyToReplyLikeId: existingLike.commentReplyToReplyLikeId,
        },
        data: {
          isLiked: !existingLike.isLiked,
        },
      });

      return NextResponse.json(updatedLike, { status: 200 });
    } else {
      // Create a new like
      const newLike = await prisma.forumCommentReplyToReplyLikes.create({
        data: {
          replyToReplyId,
          userId: user.id,
          isLiked: true,
          forumId,
        },
      });

      return NextResponse.json(newLike, { status: 201 });
    }
  } catch (error) {
    console.error("Error handling reply-to-reply like:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
