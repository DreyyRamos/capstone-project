import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // Await the params to resolve the Promise
  // const resolvedParams = await params;
  // const replyId = resolvedParams.replyId;

  const { replyId } = await params;

  try {
    // const existingLike = await prisma.forumCommentReplyLikes.findUnique({
    //   where: {
    //     replyId_userId: { replyId: replyId, userId: user.id },
    //   },
    // });

    // if (existingLike) {
    //   const updatedLike = await prisma.forumCommentReplyLikes.update({
    //     where: {
    //       commentReplyLikeId: existingLike.commentReplyLikeId,
    //     },
    //     data: {
    //       isLiked: !existingLike.isLiked,
    //     },
    //   });
    //   return NextResponse.json(updatedLike);
    // } else {
    //   const newLike = await prisma.forumCommentReplyLikes.create({
    //     data: {
    //       replyId: replyId,
    //       userId: user.id,
    //       isLiked: true,
    //     },
    //   });
    //   return NextResponse.json(newLike);
    // }

    const likePub = await prisma.$transaction(async (tx) => {
      const forumCommentReplies = await tx.forumCommentReplies.findUnique({
        where: { replyId },
        select: { reply_authorId: true },
      });
      if (!forumCommentReplies)
        throw new Error("Publication comment not found");

      const authorId = forumCommentReplies.reply_authorId; // still nullable
      const existingLike = await tx.forumCommentReplyLikes.findUnique({
        where: { replyId_userId: { replyId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.forumCommentReplyLikes.update({
          where: { commentReplyLikeId: existingLike.commentReplyLikeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.forumCommentReplyLikes.create({
          data: { replyId, userId: user.id, isLiked: true },
        });
        if (authorId) shouldAward = true;
      }

      // one-time reputation bump (only on first-ever like from user)
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
      data: likePub,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}
