import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authResult = await authMiddleware(request);
  if (authResult instanceof NextResponse) return authResult;
  const { id: userId } = authResult.user;

  // Basic validation
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // 1. Fetch all user-authored content in parallel for efficiency
    const [
      publications,
      forums,
      pubComments,
      pubReplies,
      pubReplyToReplies,
      forumComments,
      forumReplies,
      forumReplyToReplies,
    ] = await Promise.all([
      prisma.publication.findMany({
        where: { authorId: userId },
        select: {
          pubId: true,
          title: true,
          createdAt: true,
          _count: {
            select: { pubComments: true, pubLikes: true },
          },
        },
      }),
      prisma.forum.findMany({
        where: { authorId: userId },
        select: { forumId: true, topicTitle: true, createdAt: true },
      }),
      prisma.publicationComments.findMany({
        where: { authorId: userId },
        select: {
          comment_content: true,
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
        },
      }),
      prisma.publicationCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          reply_content: true,
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
        },
      }),
      prisma.publicationCommentReplyToReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          replyToReply_content: true,
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
        },
      }),
      prisma.forumComments.findMany({
        where: { authorId: userId },
        select: {
          comment_content: true,
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
        },
      }),
      prisma.forumCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          reply_content: true,
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
        },
      }),
      prisma.forumCommentReplyToReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          replyToReply_content: true,
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
        },
      }),
    ]);

    // 2. Map publications and forums into a consistent format
    const publishedActivity = [
      ...publications.map((p) => ({
        type: "PUBLISHED",
        context: "publication",
        title: p.title,
        id: p.pubId,
        createdAt: p.createdAt,
        commentCount: p._count.pubComments,
        likeCounts: p._count.pubLikes,
      })),
      ...forums.map((f) => ({
        type: "PUBLISHED",
        context: "forum",
        title: f.topicTitle,
        id: f.forumId,
        createdAt: f.createdAt,
      })),
    ];

    // 3. Map all comments and replies into a consistent "REPLIED" format
    const repliedActivity = [
      // Publication replies
      ...pubComments.map((c) => ({
        type: "REPLIED",
        context: "publication",
        parentTitle: c.publication?.title,
        parentId: c.publication?.pubId,
        createdAt: c.createdAt,
      })),
      ...pubReplies.map((r) => ({
        type: "REPLIED",
        context: "publication",
        parentTitle: r.publication?.title,
        parentId: r.publication?.pubId,
        createdAt: r.createdAt,
      })),
      ...pubReplyToReplies.map((r) => ({
        type: "REPLIED",
        context: "publication",
        parentTitle: r.publication?.title,
        parentId: r.publication?.pubId,
        createdAt: r.createdAt,
      })),
      // Forum replies
      ...forumComments.map((c) => ({
        type: "REPLIED",
        context: "forum",
        parentTitle: c.forum?.topicTitle,
        parentId: c.forum?.forumId,
        createdAt: c.createdAt,
      })),
      ...forumReplies.map((r) => ({
        type: "REPLIED",
        context: "forum",
        parentTitle: r.forum?.topicTitle,
        parentId: r.forum?.forumId,
        createdAt: r.createdAt,
      })),
      ...forumReplyToReplies.map((r) => ({
        type: "REPLIED",
        context: "forum",
        parentTitle: r.forum?.topicTitle,
        parentId: r.forum?.forumId,
        createdAt: r.createdAt,
      })),
    ];

    // 4. Combine all activities into a single array
    const allActivities = [...publishedActivity, ...repliedActivity];

    // 5. Sort the array by date, with the most recent activity first
    allActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // 6. Return the unified and sorted activity list
    return NextResponse.json(allActivities);
  } catch (error) {
    console.error("Failed to fetch user activity:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching activity." },
      { status: 500 }
    );
  }
}
