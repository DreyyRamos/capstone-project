import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { commentId } = await params;

  try {
    // const existingLike = await prisma.forumCommentLikes.findUnique({
    //   where: {
    //     commentId_userId: { commentId: commentId, userId: user.id },
    //   },
    // });

    // if (existingLike) {
    //   const updatedLike = await prisma.forumCommentLikes.update({
    //     where: {
    //       commentLikeId: existingLike.commentLikeId,
    //     },
    //     data: {
    //       isLiked: !existingLike.isLiked,
    //     },
    //   });
    //   return NextResponse.json(updatedLike);
    // } else {
    //   const newLike = await prisma.forumCommentLikes.create({
    //     data: {
    //       commentId: commentId,
    //       userId: user.id,
    //       isLiked: true,
    //     },
    //   });
    //   return NextResponse.json(newLike);
    // }

    const forumLike = await prisma.$transaction(async (tx) => {
      const pub = await tx.forumComments.findUnique({
        where: { commentId },
        select: { authorId: true },
      });
      if (!pub) throw new Error("Publication not found");

      const authorId = pub.authorId; // still nullable
      const existingLike = await tx.forumCommentLikes.findUnique({
        where: { commentId_userId: { commentId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.forumCommentLikes.update({
          where: { commentLikeId: existingLike.commentLikeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.forumCommentLikes.create({
          data: { commentId, userId: user.id, isLiked: true },
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
      message: "Forum liked successfully!",
      data: forumLike,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}
