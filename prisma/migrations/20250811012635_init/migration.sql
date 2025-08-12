-- AlterTable
ALTER TABLE "PublicationCommentReplies" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentReplyId" TEXT;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplies" ADD CONSTRAINT "PublicationCommentReplies_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "PublicationCommentReplies"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;
