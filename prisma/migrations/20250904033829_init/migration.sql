/*
  Warnings:

  - You are about to drop the column `Reason` on the `ChangeUserRole` table. All the data in the column will be lost.
  - Added the required column `reason` to the `ChangeUserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ChangeUserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChangeUserRole" DROP COLUMN "Reason",
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
