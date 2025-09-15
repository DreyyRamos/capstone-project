import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../(middlware)/authMiddleware";

export async function GET(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const posts = await prisma.forum.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        forumId: true,
        topicTitle: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        category: true,
        forumComments: {
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
        forumLikes: true,
      },
    });

    return NextResponse.json({ status: 200, posts });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
