import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../(middlware)/authMiddleware";

export async function GET(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  //   const { id } = authResult.user;

  try {
    const posts = await prisma.publication.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: "PUBLISHED" },
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
            commentId: true,
            comment_content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            replies: {
              select: {
                replyId: true,
                reply_content: true,
                createdAt: true,
                reply_author: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                  },
                },
              },
            },
          },
        },
        pubLikes: true,
      },
    });

    return NextResponse.json({ status: 200, posts });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
