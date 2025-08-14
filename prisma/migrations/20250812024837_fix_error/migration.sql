/*
  Warnings:

  - You are about to drop the `ForumReplies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `PublicationCommentReplies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PublicationCommentReplyToReplies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PublicationComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ForumReplies" DROP CONSTRAINT "ForumReplies_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ForumReplies" DROP CONSTRAINT "ForumReplies_forumId_fkey";

-- AlterTable: PublicationCommentReplies
ALTER TABLE "PublicationCommentReplies"
ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "PublicationCommentReplies"
SET    "updatedAt" = CURRENT_TIMESTAMP
WHERE  "updatedAt" IS NULL;

ALTER TABLE "PublicationCommentReplies"
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable: PublicationCommentReplyToReplies
ALTER TABLE "PublicationCommentReplyToReplies"
ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "PublicationCommentReplyToReplies"
SET    "updatedAt" = CURRENT_TIMESTAMP
WHERE  "updatedAt" IS NULL;

ALTER TABLE "PublicationCommentReplyToReplies"
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable: PublicationComments
ALTER TABLE "PublicationComments"
ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "PublicationComments"
SET    "updatedAt" = CURRENT_TIMESTAMP
WHERE  "updatedAt" IS NULL;

ALTER TABLE "PublicationComments"
ALTER COLUMN "updatedAt" SET NOT NULL;

-- DropTable
DROP TABLE "ForumReplies";

-- CreateTable
CREATE TABLE "ForumComments" (
    "replyId" TEXT NOT NULL,
    "forumReply" TEXT,
    "forumId" TEXT,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumComments_pkey" PRIMARY KEY ("replyId")
);

-- CreateTable
CREATE TABLE "ForumCommentReplies" (
    "replyId" TEXT NOT NULL,
    "reply_content" TEXT,
    "commentId" TEXT,
    "reply_authorId" TEXT,
    "forumId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumCommentReplies_pkey" PRIMARY KEY ("replyId")
);

-- CreateTable
CREATE TABLE "ForumCommentReplyToReplies" (
    "replyToReplyId" TEXT NOT NULL,
    "replyToReply_content" TEXT,
    "parentReplyId" TEXT NOT NULL,
    "reply_authorId" TEXT,
    "forumId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumCommentReplyToReplies_pkey" PRIMARY KEY ("replyToReplyId")
);

-- AddForeignKey
ALTER TABLE "ForumComments" ADD CONSTRAINT "ForumComments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComments" ADD CONSTRAINT "ForumComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ForumComments"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_reply_authorId_fkey" FOREIGN KEY ("reply_authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplies" ADD CONSTRAINT "ForumCommentReplyToReplies_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "ForumCommentReplies"("replyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplies" ADD CONSTRAINT "ForumCommentReplyToReplies_reply_authorId_fkey" FOREIGN KEY ("reply_authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplies" ADD CONSTRAINT "ForumCommentReplyToReplies_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;