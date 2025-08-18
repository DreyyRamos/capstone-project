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
  const resolvedParams = await params;
  const replyId = resolvedParams.replyId;

  try {
    const existingLike = await prisma.forumCommentReplyLikes.findUnique({
      where: {
        replyId_userId: { replyId: replyId, userId: user.id },
      },
    });

    if (existingLike) {
      const updatedLike = await prisma.forumCommentReplyLikes.update({
        where: {
          commentReplyLikeId: existingLike.commentReplyLikeId,
        },
        data: {
          isLiked: !existingLike.isLiked,
        },
      });
      return NextResponse.json(updatedLike);
    } else {
      const newLike = await prisma.forumCommentReplyLikes.create({
        data: {
          replyId: replyId,
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
