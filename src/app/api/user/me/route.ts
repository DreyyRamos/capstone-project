import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";

export async function GET(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { id } = authResult.user;

  try {
    const userData = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        role: true,
        notifications: true,
        bio: true,
        contactNumber: true,
        location: true,
        interests: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        forums: {
          select: {
            topicTitle: true,
            forumId: true,
            category: true,
            createdAt: true,
            forumComments: true,
            forumCommentReplies: true,
            ForumCommentReplyToReplies: true,
            forumLikes: true,
          },
        },
        publications: {
          select: {
            title: true,
            pubId: true,
            category: true,
            createdAt: true,
            status: true,
            pubComments: true,
            pubCommentsReplies: true,
            PublicationCommentReplyToReplies: true,
            pubLikes: true,
          },
        },
      },
    });
    return NextResponse.json({ status: 200, userData });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
