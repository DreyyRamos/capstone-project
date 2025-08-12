/*
  Warnings:

  - You are about to drop the column `mentions` on the `PublicationCommentReplies` table. All the data in the column will be lost.
  - You are about to drop the column `mentions` on the `PublicationComments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PublicationCommentReplies" DROP COLUMN "mentions";

-- AlterTable
ALTER TABLE "PublicationComments" DROP COLUMN "mentions";
