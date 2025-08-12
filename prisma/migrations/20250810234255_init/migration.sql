-- CreateTable
CREATE TABLE "PublicationCommentReplies" (
    "replyId" TEXT NOT NULL,
    "reply_content" TEXT,
    "commentId" TEXT,
    "reply_authorId" TEXT,
    "publicationPubId" TEXT,

    CONSTRAINT "PublicationCommentReplies_pkey" PRIMARY KEY ("replyId")
);

-- AddForeignKey
ALTER TABLE "PublicationCommentReplies" ADD CONSTRAINT "PublicationCommentReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PublicationComments"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplies" ADD CONSTRAINT "PublicationCommentReplies_reply_authorId_fkey" FOREIGN KEY ("reply_authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplies" ADD CONSTRAINT "PublicationCommentReplies_publicationPubId_fkey" FOREIGN KEY ("publicationPubId") REFERENCES "Publication"("pubId") ON DELETE SET NULL ON UPDATE CASCADE;
