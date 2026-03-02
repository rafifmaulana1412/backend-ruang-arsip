import prisma from "../../src/config/prisma.js";

export async function seedLetterPriorities() {
    console.log("Seeding letter priorities...");

    await prisma.letter_priorities.createMany({
        data: [
            { id: crypto.randomUUID(), name: "Biasa" },
            { id: crypto.randomUUID(), name: "Sedang" },
            { id: crypto.randomUUID(), name: "Urgent" },
            { id: crypto.randomUUID(), name: "Finance" },
        ],
        skipDuplicates: true,
    });

    console.log("Letter priorities seeded!");
}