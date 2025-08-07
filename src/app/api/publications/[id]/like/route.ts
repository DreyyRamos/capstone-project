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
  const resolvedParams = await params;
  const pubId = resolvedParams.id;

  try {
    const existingLike = await prisma.publicationLikes.findUnique({
      where: {
        pubId_userId: { pubId: pubId, userId: user.id },
      },
    });

    if (existingLike) {
      const updatedLike = await prisma.publicationLikes.update({
        where: {
          likeId: existingLike.likeId,
        },
        data: {
          isLiked: !existingLike.isLiked,
        },
      });
      return NextResponse.json(updatedLike);
    } else {
      const newLike = await prisma.publicationLikes.create({
        data: {
          pubId: pubId,
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
