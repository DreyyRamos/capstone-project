import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
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
      // Publications (no change needed)
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
      // Forums (no change needed)
      prisma.forum.findMany({
        where: { authorId: userId },
        select: { forumId: true, topicTitle: true, createdAt: true },
      }),
      // Publication Comments (no change needed)
      prisma.publicationComments.findMany({
        where: { authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
        },
      }),
      // 👇 UPDATED QUERY for Publication Replies
      prisma.publicationCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } }, // Direct link
          comment: {
            // Fallback through parent comment
            select: {
              publication: { select: { pubId: true, title: true } },
            },
          },
        },
      }),
      // 👇 UPDATED QUERY for Replies to Replies
      prisma.publicationCommentReplyToReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } }, // Direct link
          parentReply: {
            // Fallback through parent reply -> comment
            select: {
              comment: {
                select: {
                  publication: { select: { pubId: true, title: true } },
                },
              },
            },
          },
        },
      }),
      // Forum Comments (no change needed)
      prisma.forumComments.findMany({
        where: { authorId: userId },
        select: {
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
        },
      }),
      // 👇 UPDATED QUERY for Forum Replies
      prisma.forumCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
          comment: {
            select: {
              forum: { select: { forumId: true, topicTitle: true } },
            },
          },
        },
      }),
      // 👇 UPDATED QUERY for Forum Replies to Replies
      prisma.forumCommentReplyToReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
          parentReply: {
            select: {
              comment: {
                select: {
                  forum: { select: { forumId: true, topicTitle: true } },
                },
              },
            },
          },
        },
      }),
    ]);

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

    // 👇 UPDATED MAPPING LOGIC for all replies
    const repliedActivity = [
      ...pubComments.map((c) => ({
        type: "REPLIED",
        context: "publication",
        parentTitle: c.publication?.title,
        parentId: c.publication?.pubId,
        createdAt: c.createdAt,
      })),
      ...pubReplies.map((r) => {
        const publication = r.publication || r.comment?.publication; // Use direct link or fallback
        return {
          type: "REPLIED",
          context: "publication",
          parentTitle: publication?.title,
          parentId: publication?.pubId,
          createdAt: r.createdAt,
        };
      }),
      ...pubReplyToReplies.map((r) => {
        const publication =
          r.publication || r.parentReply?.comment?.publication; // Use direct link or fallback
        return {
          type: "REPLIED",
          context: "publication",
          parentTitle: publication?.title,
          parentId: publication?.pubId,
          createdAt: r.createdAt,
        };
      }),
      ...forumComments.map((c) => ({
        type: "REPLIED",
        context: "forum",
        parentTitle: c.forum?.topicTitle,
        parentId: c.forum?.forumId,
        createdAt: c.createdAt,
      })),
      ...forumReplies.map((r) => {
        const forum = r.forum || r.comment?.forum; // Use direct link or fallback
        return {
          type: "REPLIED",
          context: "forum",
          parentTitle: forum?.topicTitle,
          parentId: forum?.forumId,
          createdAt: r.createdAt,
        };
      }),
      ...forumReplyToReplies.map((r) => {
        const forum = r.forum || r.parentReply?.comment?.forum; // Use direct link or fallback
        return {
          type: "REPLIED",
          context: "forum",
          parentTitle: forum?.topicTitle,
          parentId: forum?.forumId,
          createdAt: r.createdAt,
        };
      }),
    ];

    const allActivities = [...publishedActivity, ...repliedActivity];
    allActivities.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allActivities);
  } catch (error) {
    console.error("Failed to fetch user activity:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching activity." },
      { status: 500 }
    );
  }
}
