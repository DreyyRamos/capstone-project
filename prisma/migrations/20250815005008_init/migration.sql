/*
  Warnings:

  - The primary key for the `ForumCommentLikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ForumCommentLikes` table. All the data in the column will be lost.
  - The primary key for the `ForumCommentReplyLikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ForumCommentReplyLikes` table. All the data in the column will be lost.
  - The primary key for the `ForumCommentReplyToReplyLikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ForumCommentReplyToReplyLikes` table. All the data in the column will be lost.
  - The required column `commentLikeId` was added to the `ForumCommentLikes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `commentReplyLikeId` was added to the `ForumCommentReplyLikes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `commentReplyToReplyLikeId` was added to the `ForumCommentReplyToReplyLikes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ForumCommentLikes" DROP CONSTRAINT "ForumCommentLikes_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentLikeId" TEXT NOT NULL,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "ForumCommentLikes_pkey" PRIMARY KEY ("commentLikeId");

-- AlterTable
ALTER TABLE "ForumCommentReplyLikes" DROP CONSTRAINT "ForumCommentReplyLikes_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentReplyLikeId" TEXT NOT NULL,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "ForumCommentReplyLikes_pkey" PRIMARY KEY ("commentReplyLikeId");

-- AlterTable
ALTER TABLE "ForumCommentReplyToReplyLikes" DROP CONSTRAINT "ForumCommentReplyToReplyLikes_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentReplyToReplyLikeId" TEXT NOT NULL,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "ForumCommentReplyToReplyLikes_pkey" PRIMARY KEY ("commentReplyToReplyLikeId");
