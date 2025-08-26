-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'WARNED', 'SUSPENDED', 'BANNED');

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "autoProcessed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "warningIssued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastWarningAt" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "suspendedUntil" TIMESTAMP(3),
ADD COLUMN     "warningPoints" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserWarningLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "reportId" TEXT,
    "pointsAdded" INTEGER NOT NULL DEFAULT 1,
    "totalPoints" INTEGER NOT NULL,
    "actionTaken" TEXT,
    "processedBy" TEXT,
    "isAutomatic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWarningLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserWarningLog" ADD CONSTRAINT "UserWarningLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWarningLog" ADD CONSTRAINT "UserWarningLog_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports"("reportId") ON DELETE SET NULL ON UPDATE CASCADE;
