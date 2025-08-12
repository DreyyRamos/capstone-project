/*
  Warnings:

  - You are about to drop the column `parentReplyId` on the `PublicationCommentReplies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicationCommentReplies" DROP CONSTRAINT "PublicationCommentReplies_parentReplyId_fkey";

-- AlterTable
ALTER TABLE "PublicationCommentReplies" DROP COLUMN "parentReplyId",
ADD COLUMN     "publicationPubId" TEXT;

-- AddForeignKey
ALTER TABLE "PublicationCommentReplies" ADD CONSTRAINT "PublicationCommentReplies_publicationPubId_fkey" FOREIGN KEY ("publicationPubId") REFERENCES "Publication"("pubId") ON DELETE SET NULL ON UPDATE CASCADE;
