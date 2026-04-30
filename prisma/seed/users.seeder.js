import prisma from "../../src/config/prisma.js";
import { hashPassword } from "../../src/utils/bcrypt.js";

export async function seedUsers() {
  console.log("Seeding users...");
  await prisma.users.deleteMany();

  const itRole = await prisma.roles.findFirst({ where: { name: "IT" } });
  const itDivision = await prisma.divisions.findFirst({
    where: { name: "IT" },
  });

  if (!itRole || !itDivision) {
    throw new Error(
      "IT Role or IT Division not found! Make sure roles and divisions are seeded first.",
    );
  }

  const hashedPassword = await hashPassword("password123");

  await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      name: "Administrator IT",
      username: "fal",
      email: "fal@ruangarsip.test",
      phone: "081234567890",
      password: hashedPassword,
      role_id: itRole.id,
      division_id: itDivision.id,
      is_active: true,
      is_restrict: false,
      email_verified_at: new Date(),
      password_set_at: new Date(),
    },
  });

  console.log("Users seeded! (Login: fal / 12345678)");
}
