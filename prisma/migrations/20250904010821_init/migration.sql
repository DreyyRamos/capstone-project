-- CreateEnum
CREATE TYPE "ChangeRoleStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- CreateTable
CREATE TABLE "ChangeUserRole" (
    "request_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "currentRole" "Role" NOT NULL DEFAULT 'STUDENT',
    "requestedRole" "Role" NOT NULL,
    "Reason" TEXT NOT NULL,
    "additionalInformation" TEXT,
    "status" "ChangeRoleStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangeUserRole_pkey" PRIMARY KEY ("request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChangeUserRole_request_id_key" ON "ChangeUserRole"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChangeUserRole_email_key" ON "ChangeUserRole"("email");
