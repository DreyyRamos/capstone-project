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

  // Await the params to resolve the Promise
  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;
  const { id: pubId } = await params;

  try {
    const likePub = await prisma.$transaction(async (tx) => {
      const pub = await tx.publication.findUnique({
        where: { pubId },
        select: { authorId: true },
      });
      if (!pub) throw new Error("Publication not found");

      const authorId = pub.authorId; // still nullable
      const existingLike = await tx.publicationLikes.findUnique({
        where: { pubId_userId: { pubId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.publicationLikes.update({
          where: { likeId: existingLike.likeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.publicationLikes.create({
          data: { pubId, userId: user.id, isLiked: true },
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
      message: "Publication liked successfully!",
      data: likePub,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}

