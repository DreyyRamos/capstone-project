import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params;

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
      // 1. Publications
      prisma.publication.findMany({
        where: { authorId: userId },
        select: {
          pubId: true,
          title: true,
          createdAt: true,
          _count: { select: { pubComments: true, pubLikes: true } },
        },
      }),
      // 2. Forums
      prisma.forum.findMany({
        where: { authorId: userId },
        select: {
          forumId: true,
          topicTitle: true,
          createdAt: true,
          _count: { select: { forumComments: true, forumLikes: true } },
        },
      }),
      // 3. Publication Comments
      prisma.publicationComments.findMany({
        where: { authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
          _count: { select: { replies: true, pubCommentLikes: true } },
        },
      }),
      // 4. Publication Replies
      prisma.publicationCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
          comment: {
            select: { publication: { select: { pubId: true, title: true } } },
          },
          _count: { select: { children: true, pubCommentReplyLikes: true } },
        },
      }),
      // 5. Publication Reply-to-Replies
      prisma.publicationCommentReplyToReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          publication: { select: { pubId: true, title: true } },
          parentReply: {
            select: {
              comment: {
                select: {
                  publication: { select: { pubId: true, title: true } },
                },
              },
            },
          },
          _count: { select: { publicationCommentReplyToReplyLikes: true } },
        },
      }),
      // 6. Forum Comments
      prisma.forumComments.findMany({
        where: { authorId: userId },
        select: {
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
          _count: { select: { replies: true, forumCommentLikes: true } },
        },
      }),
      // 7. Forum Replies
      prisma.forumCommentReplies.findMany({
        where: { reply_authorId: userId },
        select: {
          createdAt: true,
          forum: { select: { forumId: true, topicTitle: true } },
          comment: {
            select: { forum: { select: { forumId: true, topicTitle: true } } },
          },
          _count: { select: { children: true, forumCommentReplyLikes: true } },
        },
      }),
      // 8. Forum Reply-to-Replies
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
          _count: { select: { forumCommentReplyToReplyLikes: true } },
        },
      }),
    ]);

    // MAP PUBLISHED ACTIVITY
    const publishedActivity = [
      ...publications.map((p) => ({
        type: "PUBLISHED",
        context: "publication",
        title: p.title,
        id: p.pubId,
        createdAt: p.createdAt,
        commentCount: p._count.pubComments,
        likeCount: p._count.pubLikes,
      })),
      ...forums.map((f) => ({
        type: "PUBLISHED",
        context: "forum",
        title: f.topicTitle,
        id: f.forumId,
        createdAt: f.createdAt,
        commentCount: f._count.forumComments,
        likeCount: f._count.forumLikes,
      })),
    ];

    // MAP REPLIED ACTIVITY
    const repliedActivity = [
      ...pubComments.map((c) => ({
        type: "REPLIED",
        context: "publication",
        parentTitle: c.publication?.title,
        parentId: c.publication?.pubId,
        createdAt: c.createdAt,
        replyCount: c._count.replies,
        likeCount: c._count.pubCommentLikes,
      })),
      ...pubReplies.map((r) => {
        const publication = r.publication || r.comment?.publication;
        return {
          type: "REPLIED",
          context: "publication",
          parentTitle: publication?.title,
          parentId: publication?.pubId,
          createdAt: r.createdAt,
          replyCount: r._count.children,
          likeCount: r._count.pubCommentReplyLikes,
        };
      }),
      ...pubReplyToReplies.map((r) => {
        const publication =
          r.publication || r.parentReply?.comment?.publication;
        return {
          type: "REPLIED",
          context: "publication",
          parentTitle: publication?.title,
          parentId: publication?.pubId,
          createdAt: r.createdAt,
          replyCount: 0, // No further replies
          likeCount: r._count.publicationCommentReplyToReplyLikes,
        };
      }),
      ...forumComments.map((c) => ({
        type: "REPLIED",
        context: "forum",
        parentTitle: c.forum?.topicTitle,
        parentId: c.forum?.forumId,
        createdAt: c.createdAt,
        replyCount: c._count.replies,
        likeCount: c._count.forumCommentLikes,
      })),
      ...forumReplies.map((r) => {
        const forum = r.forum || r.comment?.forum;
        return {
          type: "REPLIED",
          context: "forum",
          parentTitle: forum?.topicTitle,
          parentId: forum?.forumId,
          createdAt: r.createdAt,
          replyCount: r._count.children,
          likeCount: r._count.forumCommentReplyLikes,
        };
      }),
      ...forumReplyToReplies.map((r) => {
        const forum = r.forum || r.parentReply?.comment?.forum;
        return {
          type: "REPLIED",
          context: "forum",
          parentTitle: forum?.topicTitle,
          parentId: forum?.forumId,
          createdAt: r.createdAt,
          replyCount: 0, // No further replies
          likeCount: r._count.forumCommentReplyToReplyLikes,
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
