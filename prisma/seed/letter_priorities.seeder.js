import prisma from "../../src/config/prisma.js";

export async function seedLetterPriorities() {
  console.log("Seeding letter priorities...");

  await prisma.letter_priorities.createMany({
    data: [
      { id: crypto.randomUUID(), name: "Biasa" },
      { id: crypto.randomUUID(), name: "Rahasia" },
      { id: crypto.randomUUID(), name: "Terbatas" },
      { id: crypto.randomUUID(), name: "Sangat Terbatas" },
    ],
    skipDuplicates: true,
  });

  console.log("Letter priorities seeded!");
}
