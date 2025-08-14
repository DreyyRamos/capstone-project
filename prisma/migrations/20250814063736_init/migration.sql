/*
  Warnings:

  - You are about to drop the column `forumForumId` on the `ForumCommentReplies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForumCommentReplies" DROP CONSTRAINT "ForumCommentReplies_forumForumId_fkey";

-- AlterTable
ALTER TABLE "ForumCommentReplies" DROP COLUMN "forumForumId",
ADD COLUMN     "forumId" TEXT;

-- AddForeignKey
ALTER TABLE "ForumCommentReplies" ADD CONSTRAINT "ForumCommentReplies_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;
