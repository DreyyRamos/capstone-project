/*
  Warnings:

  - The values [UNDER_REVIEW,DISMISSED] on the enum `ReportStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportStatus_new" AS ENUM ('PENDING', 'RESTORED', 'RESOLVED', 'DELETED');
ALTER TABLE "Reports" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reports" ALTER COLUMN "status" TYPE "ReportStatus_new" USING ("status"::text::"ReportStatus_new");
ALTER TYPE "ReportStatus" RENAME TO "ReportStatus_old";
ALTER TYPE "ReportStatus_new" RENAME TO "ReportStatus";
DROP TYPE "ReportStatus_old";
ALTER TABLE "Reports" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Publication" ALTER COLUMN "excerpt" SET DATA TYPE VARCHAR(1000);
