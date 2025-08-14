/*
  Warnings:

  - The primary key for the `ForumComments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `forumReply` on the `ForumComments` table. All the data in the column will be lost.
  - You are about to drop the column `replyId` on the `ForumComments` table. All the data in the column will be lost.
  - The required column `commentId` was added to the `ForumComments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ForumCommentReplies" DROP CONSTRAINT "ForumCommentReplies_commentId_fkey";

-- AlterTable
ALTER TABLE "ForumComments" DROP CONSTRAINT "ForumComments_pkey",
DROP COLUMN "forumReply",
DROP COLUMN "replyId",
ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "comment_content" TEXT,
ADD CONSTRAINT "ForumComments_pkey" PRIMARY KEY ("commentId");

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ForumComments"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;
