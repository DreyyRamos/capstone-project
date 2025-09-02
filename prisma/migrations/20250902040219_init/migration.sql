-- CreateEnum
CREATE TYPE "AdmissionStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- AlterTable
ALTER TABLE "UserAdmission" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "status" "AdmissionStatus" NOT NULL DEFAULT 'PENDING';
