/*
  Warnings:

  - You are about to drop the column `comment_content` on the `ForumReplies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ForumReplies" DROP COLUMN "comment_content",
ADD COLUMN     "forumReply" TEXT;
