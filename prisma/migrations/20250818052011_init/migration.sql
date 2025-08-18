/*
  Warnings:

  - The values [USER_PROFILE] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [ESCALATED] on the enum `ReportStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('FORUM_POST', 'FORUM_COMMENT', 'FORUM_REPLY', 'FORUM_REPLY_TO_REPLY', 'PUBLICATION', 'PUBLICATION_COMMENT', 'PUBLICATION_REPLY', 'PUBLICATION_REPLY_TO_REPLY');
ALTER TABLE "Reports" ALTER COLUMN "contentType" TYPE "ContentType_new" USING ("contentType"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "ContentType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReportStatus_new" AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED');
ALTER TABLE "Reports" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reports" ALTER COLUMN "status" TYPE "ReportStatus_new" USING ("status"::text::"ReportStatus_new");
ALTER TYPE "ReportStatus" RENAME TO "ReportStatus_old";
ALTER TYPE "ReportStatus_new" RENAME TO "ReportStatus";
DROP TYPE "ReportStatus_old";
ALTER TABLE "Reports" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
