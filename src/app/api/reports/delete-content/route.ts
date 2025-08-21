import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  try {
    const { contentType, contentId, reportId } = await request.json();

    if (!contentType || !contentId || !reportId) {
      return NextResponse.json(
        { error: "contentType, contentId, and reportId are required" },
        { status: 400 }
      );
    }

    let contentExists = false;
    let deletionMessage = "Content deleted successfully";

    // Check if content exists and delete based on type
    switch (contentType) {
      case "FORUM_POST":
        const forum = await prisma.forum.findUnique({
          where: { forumId: contentId },
        });
        if (!forum) {
          deletionMessage = "Forum post was already deleted";
        } else {
          // This will cascade delete all comments, replies, and child replies due to onDelete: Cascade
          await prisma.forum.delete({ where: { forumId: contentId } });
          contentExists = true;
        }
        break;

      case "FORUM_COMMENT":
        const forumComment = await prisma.forumComments.findUnique({
          where: { commentId: contentId },
        });
        if (!forumComment) {
          deletionMessage = "Forum comment was already deleted";
        } else {
          // This will cascade delete all replies and child replies due to onDelete: Cascade
          await prisma.forumComments.delete({
            where: { commentId: contentId },
          });
          contentExists = true;
        }
        break;

      case "FORUM_REPLY":
        const forumReply = await prisma.forumCommentReplies.findUnique({
          where: { replyId: contentId },
        });
        if (!forumReply) {
          deletionMessage = "Forum reply was already deleted";
        } else {
          // This will cascade delete all child replies (ForumCommentReplyToReplies)
          await prisma.forumCommentReplies.delete({
            where: { replyId: contentId },
          });
          contentExists = true;
        }
        break;

      case "FORUM_REPLY_TO_REPLY":
        const forumReplyToReply =
          await prisma.forumCommentReplyToReplies.findUnique({
            where: { replyToReplyId: contentId },
          });
        if (!forumReplyToReply) {
          deletionMessage = "Forum reply was already deleted";
        } else {
          await prisma.forumCommentReplyToReplies.delete({
            where: { replyToReplyId: contentId },
          });
          contentExists = true;
        }
        break;

      case "PUBLICATION":
        const publication = await prisma.publication.findUnique({
          where: { pubId: contentId },
        });
        if (!publication) {
          deletionMessage = "Publication was already deleted";
        } else {
          // This will cascade delete all comments, replies, and child replies
          await prisma.publication.delete({ where: { pubId: contentId } });
          contentExists = true;
        }
        break;

      case "PUBLICATION_COMMENT":
        const pubComment = await prisma.publicationComments.findUnique({
          where: { commentId: contentId },
        });
        if (!pubComment) {
          deletionMessage = "Publication comment was already deleted";
        } else {
          // This will cascade delete all replies and child replies
          await prisma.publicationComments.delete({
            where: { commentId: contentId },
          });
          contentExists = true;
        }
        break;

      case "PUBLICATION_REPLY":
        const pubReply = await prisma.publicationCommentReplies.findUnique({
          where: { replyId: contentId },
        });
        if (!pubReply) {
          deletionMessage = "Publication reply was already deleted";
        } else {
          // This will cascade delete all child replies
          await prisma.publicationCommentReplies.delete({
            where: { replyId: contentId },
          });
          contentExists = true;
        }
        break;

      case "PUBLICATION_REPLY_TO_REPLY":
        const pubReplyToReply =
          await prisma.publicationCommentReplyToReplies.findUnique({
            where: { replyToReplyId: contentId },
          });
        if (!pubReplyToReply) {
          deletionMessage = "Publication reply was already deleted";
        } else {
          await prisma.publicationCommentReplyToReplies.delete({
            where: { replyToReplyId: contentId },
          });
          contentExists = true;
        }
        break;

      default:
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
    }

    // Update report as resolved regardless of whether content existed
    await prisma.reports.update({
      where: { reportId },
      data: {
        status: "RESOLVED",
        actionTaken: contentExists
          ? "Content deleted"
          : "Content was already deleted",
        resolvedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: deletionMessage,
      wasAlreadyDeleted: !contentExists,
    });
  } catch (error: any) {
    console.error("Delete error:", error);

    // Handle specific Prisma errors
    if (error.code === "P2025") {
      // Record not found error
      return NextResponse.json({
        success: true,
        message: "Content was already deleted",
        wasAlreadyDeleted: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
