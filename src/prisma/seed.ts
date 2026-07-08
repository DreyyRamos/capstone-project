import { PrismaClient, Role } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
