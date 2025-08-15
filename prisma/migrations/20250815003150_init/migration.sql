-- CreateTable
CREATE TABLE "ForumCommentLikes" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForumCommentLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumCommentReplyLikes" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForumCommentReplyLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumCommentReplyToReplyLikes" (
    "id" TEXT NOT NULL,
    "replyToReplyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForumCommentReplyToReplyLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForumCommentLikes_commentId_userId_key" ON "ForumCommentLikes"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ForumCommentReplyLikes_replyId_userId_key" ON "ForumCommentReplyLikes"("replyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ForumCommentReplyToReplyLikes_replyToReplyId_userId_key" ON "ForumCommentReplyToReplyLikes"("replyToReplyId", "userId");

-- AddForeignKey
ALTER TABLE "ForumCommentLikes" ADD CONSTRAINT "ForumCommentLikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ForumComments"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentLikes" ADD CONSTRAINT "ForumCommentLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyLikes" ADD CONSTRAINT "ForumCommentReplyLikes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "ForumCommentReplies"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyLikes" ADD CONSTRAINT "ForumCommentReplyLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplyLikes" ADD CONSTRAINT "ForumCommentReplyToReplyLikes_replyToReplyId_fkey" FOREIGN KEY ("replyToReplyId") REFERENCES "ForumCommentReplyToReplies"("replyToReplyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplyLikes" ADD CONSTRAINT "ForumCommentReplyToReplyLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
