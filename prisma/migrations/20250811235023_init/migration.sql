-- CreateTable
CREATE TABLE "PublicationCommentReplyToReplies" (
    "replyToReplyId" TEXT NOT NULL,
    "replyToReply_content" TEXT,
    "parentReplyId" TEXT NOT NULL,
    "reply_authorId" TEXT,
    "publicationPubId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicationCommentReplyToReplies_pkey" PRIMARY KEY ("replyToReplyId")
);

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplies" ADD CONSTRAINT "PublicationCommentReplyToReplies_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "PublicationCommentReplies"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplies" ADD CONSTRAINT "PublicationCommentReplyToReplies_reply_authorId_fkey" FOREIGN KEY ("reply_authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplies" ADD CONSTRAINT "PublicationCommentReplyToReplies_publicationPubId_fkey" FOREIGN KEY ("publicationPubId") REFERENCES "Publication"("pubId") ON DELETE SET NULL ON UPDATE CASCADE;
