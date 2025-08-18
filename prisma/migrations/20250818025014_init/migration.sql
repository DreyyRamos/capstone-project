-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FORUM_POST', 'FORUM_COMMENT', 'FORUM_REPLY', 'FORUM_REPLY_TO_REPLY', 'PUBLICATION', 'PUBLICATION_COMMENT', 'PUBLICATION_REPLY', 'PUBLICATION_REPLY_TO_REPLY', 'USER_PROFILE');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "ReportPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "Reports" (
    "reportId" TEXT NOT NULL,
    "reportedContent" TEXT NOT NULL,
    "reportReason" TEXT NOT NULL,
    "description" TEXT,
    "reportedById" TEXT NOT NULL,
    "reportedUserId" TEXT,
    "contentType" "ContentType" NOT NULL,
    "forumId" TEXT,
    "pubId" TEXT,
    "forumCommentId" TEXT,
    "pubCommentId" TEXT,
    "forumReplyId" TEXT,
    "pubReplyId" TEXT,
    "forumReplyToReplyId" TEXT,
    "pubReplyToReplyId" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "ReportPriority" NOT NULL DEFAULT 'MEDIUM',
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "moderatorNotes" TEXT,
    "actionTaken" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("reportId")
);

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_forumCommentId_fkey" FOREIGN KEY ("forumCommentId") REFERENCES "ForumComments"("commentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_pubCommentId_fkey" FOREIGN KEY ("pubCommentId") REFERENCES "PublicationComments"("commentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_forumReplyId_fkey" FOREIGN KEY ("forumReplyId") REFERENCES "ForumCommentReplies"("replyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_pubReplyId_fkey" FOREIGN KEY ("pubReplyId") REFERENCES "PublicationCommentReplies"("replyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_forumReplyToReplyId_fkey" FOREIGN KEY ("forumReplyToReplyId") REFERENCES "ForumCommentReplyToReplies"("replyToReplyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_pubReplyToReplyId_fkey" FOREIGN KEY ("pubReplyToReplyId") REFERENCES "PublicationCommentReplyToReplies"("replyToReplyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
