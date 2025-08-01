-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "pubNotifId" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_pubNotifId_fkey" FOREIGN KEY ("pubNotifId") REFERENCES "Publication"("pubId") ON DELETE SET NULL ON UPDATE CASCADE;
