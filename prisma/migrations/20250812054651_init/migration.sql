-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "forumNotifId" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_forumNotifId_fkey" FOREIGN KEY ("forumNotifId") REFERENCES "Forum"("forumId") ON DELETE SET NULL ON UPDATE CASCADE;
