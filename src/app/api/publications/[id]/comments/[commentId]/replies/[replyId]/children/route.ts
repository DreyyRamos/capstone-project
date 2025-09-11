import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;
  const { replyId } = await params;
  const { content } = await req.json();

  try {
    const comment = await prisma.$transaction(async (tx) => {
      const toComment = await tx.publicationCommentReplyToReplies.create({
        data: {
          replyToReply_content: content,
          parentReplyId: replyId,
          reply_authorId: user.id,
        },
        include: { reply_author: true },
      });

      const userToReward = await tx.user.update({
        where: { id: user.id },
        data: {
          reputationPoints: { increment: 10 },
        },
      });

      return { toComment, userToReward };
    });

    return NextResponse.json({
      status: 200,
      message: "Comment created and points rewarded successfully!",
      data: comment,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
