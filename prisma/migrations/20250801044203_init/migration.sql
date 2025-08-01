-- CreateTable
CREATE TABLE "Notifications" (
    "notifId" TEXT NOT NULL,
    "notifTitle" TEXT,
    "notifContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("notifId")
);

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
