import prisma from "../../src/config/prisma.js";

export async function seedRoles() {
  console.log("Seeding roles...");
  await prisma.roles.deleteMany();

  await prisma.roles.createMany({
    data: [
      { id: crypto.randomUUID(), name: "Manajer" },
      { id: crypto.randomUUID(), name: "Admin" },
      { id: crypto.randomUUID(), name: "Legal" },
      { id: crypto.randomUUID(), name: "IT" },
    ],
    skipDuplicates: true,
  });

  console.log("Roles seeded!");
}
