import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string; // forumId
      commentId: string; // commentId
      replyId: string; // parentReplyId
      childId: string; // replyToReplyId
    };
  }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // Await the params to resolve the Promise
  // const resolvedParams = await params;
  // const replyId = resolvedParams.replyId;

  const {
    id: pubId,
    commentId,
    replyId: parentReplyId,
    childId: replyToReplyId,
  } = params;

  try {
    const likeReply = await prisma.$transaction(async (tx) => {
      /* 1. make sure the child reply exists and grab its author */
      const childReply = await tx.publicationCommentReplyToReplies.findUnique({
        where: { replyToReplyId },
        select: { reply_authorId: true },
      });
      if (!childReply) throw new Error("Child reply not found");

      const authorId = childReply.reply_authorId; // nullable

      /* 2. existing like for this user–child pair? */
      const existingLike =
        await tx.publicationCommentReplyToReplyLikes.findUnique({
          where: { replyToReplyId_userId: { replyToReplyId, userId: user.id } },
        });

      let result;
      let shouldAward = false;

      if (existingLike) {
        /* already liked once → just toggle, never award again */
        result = await tx.publicationCommentReplyToReplyLikes.update({
          where: {
            commentReplyToReplyLikeId: existingLike.commentReplyToReplyLikeId,
          },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        /* first ever like from this user → create row + award once */
        result = await tx.publicationCommentReplyToReplyLikes.create({
          data: { replyToReplyId, userId: user.id, isLiked: true, pubId },
        });
        if (authorId) shouldAward = true;
      }

      /* 3. one-time reputation bump (only on first-ever like) */
      if (shouldAward) {
        await tx.user.update({
          where: { id: authorId! },
          data: { reputationPoints: { increment: 8 } },
        });
      }

      return result;
    });

    return NextResponse.json({
      status: 200,
      message: "Publication liked successfully!",
      data: likeReply,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}
