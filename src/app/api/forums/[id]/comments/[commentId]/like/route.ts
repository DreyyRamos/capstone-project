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

  // Await the params to resolve the Promise
  const resolvedParams = await params;
  const commentId = resolvedParams.commentId;

  try {
    const existingLike = await prisma.forumCommentLikes.findUnique({
      where: {
        commentId_userId: { commentId: commentId, userId: user.id },
      },
    });

    if (existingLike) {
      const updatedLike = await prisma.forumCommentLikes.update({
        where: {
          commentLikeId: existingLike.commentLikeId,
        },
        data: {
          isLiked: !existingLike.isLiked,
        },
      });
      return NextResponse.json(updatedLike);
    } else {
      const newLike = await prisma.forumCommentLikes.create({
        data: {
          commentId: commentId,
          userId: user.id,
          isLiked: true,
        },
      });
      return NextResponse.json(newLike);
    }
  } catch (error) {
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}
