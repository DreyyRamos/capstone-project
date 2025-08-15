/*
  Warnings:

  - Added the required column `forumId` to the `ForumCommentLikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forumId` to the `ForumCommentReplyLikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forumId` to the `ForumCommentReplyToReplyLikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForumCommentLikes" ADD COLUMN     "forumId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForumCommentReplyLikes" ADD COLUMN     "forumId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForumCommentReplyToReplyLikes" ADD COLUMN     "forumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ForumCommentLikes" ADD CONSTRAINT "ForumCommentLikes_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyLikes" ADD CONSTRAINT "ForumCommentReplyLikes_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumCommentReplyToReplyLikes" ADD CONSTRAINT "ForumCommentReplyToReplyLikes_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;
