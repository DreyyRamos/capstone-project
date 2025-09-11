import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { id: forumId } = await params;

  try {
    const forumLike = await prisma.$transaction(async (tx) => {
      const pub = await tx.forum.findUnique({
        where: { forumId },
        select: { authorId: true },
      });
      if (!pub) throw new Error("Publication not found");

      const authorId = pub.authorId; // still nullable
      const existingLike = await tx.forumLikes.findUnique({
        where: { forumId_userId: { forumId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.forumLikes.update({
          where: { likeId: existingLike.likeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.forumLikes.create({
          data: { forumId, userId: user.id, isLiked: true },
        });
        if (authorId) shouldAward = true;
      }

      // one-time reputation bump (only on first-ever like from user)
      if (shouldAward) {
        await tx.user.update({
          where: { id: authorId! },
          data: { reputationPoints: { increment: 10 } },
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
