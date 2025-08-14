/*
  Warnings:

  - You are about to drop the column `forumId` on the `ForumCommentReplies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForumCommentReplies" DROP CONSTRAINT "ForumCommentReplies_forumId_fkey";

-- AlterTable
ALTER TABLE "ForumCommentReplies" DROP COLUMN "forumId",
ADD COLUMN     "forumForumId" TEXT;

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_forumForumId_fkey" FOREIGN KEY ("forumForumId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;
