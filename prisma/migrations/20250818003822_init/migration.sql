-- CreateTable
CREATE TABLE "PublicationCommentLikes" (
    "commentLikeId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "pubId" TEXT,

    CONSTRAINT "PublicationCommentLikes_pkey" PRIMARY KEY ("commentLikeId")
);

-- CreateTable
CREATE TABLE "PublicationCommentReplyLikes" (
    "commentReplyLikeId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "pubId" TEXT,

    CONSTRAINT "PublicationCommentReplyLikes_pkey" PRIMARY KEY ("commentReplyLikeId")
);

-- CreateTable
CREATE TABLE "PublicationCommentReplyToReplyLikes" (
    "commentReplyToReplyLikeId" TEXT NOT NULL,
    "replyToReplyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "pubId" TEXT,

    CONSTRAINT "PublicationCommentReplyToReplyLikes_pkey" PRIMARY KEY ("commentReplyToReplyLikeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicationCommentLikes_commentId_userId_key" ON "PublicationCommentLikes"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationCommentReplyLikes_replyId_userId_key" ON "PublicationCommentReplyLikes"("replyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationCommentReplyToReplyLikes_replyToReplyId_userId_key" ON "PublicationCommentReplyToReplyLikes"("replyToReplyId", "userId");

-- AddForeignKey
ALTER TABLE "PublicationCommentLikes" ADD CONSTRAINT "PublicationCommentLikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PublicationComments"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentLikes" ADD CONSTRAINT "PublicationCommentLikes_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentLikes" ADD CONSTRAINT "PublicationCommentLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyLikes" ADD CONSTRAINT "PublicationCommentReplyLikes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "PublicationCommentReplies"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyLikes" ADD CONSTRAINT "PublicationCommentReplyLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyLikes" ADD CONSTRAINT "PublicationCommentReplyLikes_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplyLikes" ADD CONSTRAINT "PublicationCommentReplyToReplyLikes_replyToReplyId_fkey" FOREIGN KEY ("replyToReplyId") REFERENCES "PublicationCommentReplyToReplies"("replyToReplyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplyLikes" ADD CONSTRAINT "PublicationCommentReplyToReplyLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplyToReplyLikes" ADD CONSTRAINT "PublicationCommentReplyToReplyLikes_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE CASCADE ON UPDATE CASCADE;
