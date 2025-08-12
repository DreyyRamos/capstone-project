/*
  Warnings:

  - You are about to drop the column `publicationPubId` on the `PublicationCommentReplies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicationCommentReplies" DROP CONSTRAINT "PublicationCommentReplies_publicationPubId_fkey";

-- AlterTable
ALTER TABLE "PublicationCommentReplies" DROP COLUMN "publicationPubId";
