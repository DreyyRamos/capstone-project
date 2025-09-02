-- CreateTable
CREATE TABLE "UserAdmission" (
    "admission_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "id_picture" TEXT,
    "bio" TEXT,
    "contactNumber" TEXT,
    "location" TEXT,
    "interests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAdmission_pkey" PRIMARY KEY ("admission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmission_admission_id_key" ON "UserAdmission"("admission_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmission_user_email_key" ON "UserAdmission"("user_email");
