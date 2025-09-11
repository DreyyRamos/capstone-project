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

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;

  const { id: pubId } = await params;

  const { comment_content } = await req.json();

  try {
    const comment = await prisma.$transaction(async (tx) => {
      const toComment = await tx.publicationComments.create({
        data: {
          comment_content: comment_content,
          author: {
            connect: { id: user.id },
          },
          publication: {
            connect: { pubId: pubId },
          },
        },
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
