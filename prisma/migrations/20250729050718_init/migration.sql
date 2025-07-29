/*
  Warnings:

  - The `tags` column on the `Publication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
