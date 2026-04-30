import prisma from "../../src/config/prisma.js";

export async function seedDivisions() {
  console.log("Seeding division...");

  await prisma.divisions.createMany({
    data: [
      { id: crypto.randomUUID(), name: "IT" },
      { id: crypto.randomUUID(), name: "Admin" },
      { id: crypto.randomUUID(), name: "Manajer" },
      { id: crypto.randomUUID(), name: "HRD" },
    ],
    skipDuplicates: true,
  });

  console.log("Division seeded!");
}
