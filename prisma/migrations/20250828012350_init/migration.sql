-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "reportId" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports"("reportId") ON DELETE SET NULL ON UPDATE CASCADE;
