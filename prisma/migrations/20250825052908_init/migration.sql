/*
  Warnings:

  - You are about to drop the column `autoProcessed` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `warningIssued` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the column `lastWarningAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `suspendedUntil` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserWarningLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserWarningLog" DROP CONSTRAINT "UserWarningLog_reportId_fkey";

-- DropForeignKey
ALTER TABLE "UserWarningLog" DROP CONSTRAINT "UserWarningLog_userId_fkey";

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "autoProcessed",
DROP COLUMN "warningIssued";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastWarningAt",
DROP COLUMN "suspendedUntil";

-- DropTable
DROP TABLE "UserWarningLog";
