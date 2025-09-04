-- 1. Remove the old default (text or text[])
ALTER TABLE "User"
  ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "UserAdmission"
  ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "ChangeUserRole"
  ALTER COLUMN "currentRole" DROP DEFAULT,
  ALTER COLUMN "requestedRole" DROP DEFAULT;

-- 2. Change the type
ALTER TABLE "User"
  ALTER COLUMN "role" TYPE "Role" USING ("role"::text)::"Role";

ALTER TABLE "UserAdmission"
  ALTER COLUMN "role" TYPE "Role" USING ("role"::text)::"Role";

ALTER TABLE "ChangeUserRole"
  ALTER COLUMN "currentRole" TYPE "Role" USING ("currentRole"::text)::"Role",
  ALTER COLUMN "requestedRole" TYPE "Role" USING ("requestedRole"::text)::"Role";

-- 3. Attach the new default (enum literal)
ALTER TABLE "User"
  ALTER COLUMN "role" SET DEFAULT 'STUDENT';

ALTER TABLE "UserAdmission"
  ALTER COLUMN "role" SET DEFAULT 'STUDENT';

ALTER TABLE "ChangeUserRole"
  ALTER COLUMN "currentRole" SET DEFAULT 'STUDENT';