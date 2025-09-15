import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { reputationPoints: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        profileImage: true,
        status: true,
        createdAt: true,
        reputationPoints: true,
        _count: {
          select: {
            publications: true,
            forums: true,
            pubComments: true,
            forumComments: true,
            publicationCommentReplies: true,
            forumCommentReplies: true,
            publicationCommentReplyToReplies: true,
            forumCommentReplyToReplies: true,
          },
        },
      },
    });

    // Get likes received for each user separately
    const usersWithLikesReceived = await Promise.all(
      users.map(async (user) => {
        // Count likes on user's publications
        const publicationLikes = await prisma.publicationLikes.count({
          where: {
            publication: {
              authorId: user.id,
            },
          },
        });

        // Count likes on user's forums
        const forumLikes = await prisma.forumLikes.count({
          where: {
            forum: {
              authorId: user.id,
            },
          },
        });

        // Count likes on user's publication comments
        const pubCommentLikes = await prisma.publicationCommentLikes.count({
          where: {
            comment: {
              authorId: user.id,
            },
          },
        });

        // Count likes on user's forum comments
        const forumCommentLikes = await prisma.forumCommentLikes.count({
          where: {
            comment: {
              authorId: user.id,
            },
          },
        });

        // Count likes on user's publication replies
        const pubReplyLikes = await prisma.publicationCommentReplyLikes.count({
          where: {
            reply: {
              reply_authorId: user.id,
            },
          },
        });

        // Count likes on user's forum replies
        const forumReplyLikes = await prisma.forumCommentReplyLikes.count({
          where: {
            reply: {
              reply_authorId: user.id,
            },
          },
        });

        // Count likes on user's publication nested replies
        const pubNestedReplyLikes =
          await prisma.publicationCommentReplyToReplyLikes.count({
            where: {
              replyToReply: {
                reply_authorId: user.id,
              },
            },
          });

        // Count likes on user's forum nested replies
        const forumNestedReplyLikes =
          await prisma.forumCommentReplyToReplyLikes.count({
            where: {
              replyToReply: {
                reply_authorId: user.id,
              },
            },
          });

        const totalLikesReceived =
          publicationLikes +
          forumLikes +
          pubCommentLikes +
          forumCommentLikes +
          pubReplyLikes +
          forumReplyLikes +
          pubNestedReplyLikes +
          forumNestedReplyLikes;

        return {
          ...user,
          _count: {
            ...user._count,
            likesReceived: totalLikesReceived,
            publicationLikes,
            forumLikes,
            pubCommentLikes,
            forumCommentLikes,
            pubReplyLikes,
            forumReplyLikes,
            pubNestedReplyLikes,
            forumNestedReplyLikes,
          },
        };
      })
    );

    return NextResponse.json({ status: 200, users: usersWithLikesReceived });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}
