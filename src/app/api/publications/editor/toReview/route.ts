import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function GET(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  //   const { id } = authResult.user;

  try {
    const postToReview = await prisma.publication.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: "PENDING_REVIEW" },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            role: true,
          },
        },
        pubComments: {
          select: {
            comment_content: true,
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            commentId: true,
          },
        },
        pubLikes: true,
      },
    });
    return NextResponse.json({ status: 200, postToReview });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
