-- AlterTable
ALTER TABLE "ForumCommentLikes" ALTER COLUMN "forumId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ForumCommentReplyLikes" ALTER COLUMN "forumId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ForumCommentReplyToReplyLikes" ALTER COLUMN "forumId" DROP NOT NULL;
