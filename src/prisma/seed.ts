// prisma/seed.ts
import prisma from "@/lib/prisma";
import { Role } from "@/generated/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = "admin@email.com";
  const adminpassword = process.env.DEFAULT_ADMIN_PASSWORD as string;

  const exists = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (exists) return; // do nothing if already seeded

  await prisma.user.create({
    data: {
      email: adminEmail,
      firstName: "Default",
      lastName: "Admin",
      password: await bcrypt.hash(adminpassword, 10),
      role: Role.ADMIN,
    },
  });
  console.log("Default admin created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
