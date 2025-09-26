// In app/api/publications/isFeatured/route.ts
import prisma from "@/lib/prisma"; // Adjust import path as needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featuredPublications = await prisma.publication.findMany({
      where: {
        isFeatured: true,
      },
      // Optionally include author details or order them
      orderBy: {
        createdAt: "desc",
      },
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

    return NextResponse.json(featuredPublications);
  } catch (error) {
    console.error("Failed to fetch featured publications:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
