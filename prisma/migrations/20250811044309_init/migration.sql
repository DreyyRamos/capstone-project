-- AlterTable
ALTER TABLE "PublicationCommentReplies" ADD COLUMN     "mentions" TEXT[];

-- AlterTable
ALTER TABLE "PublicationComments" ADD COLUMN     "mentions" TEXT[];
