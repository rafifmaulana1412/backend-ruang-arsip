import prisma from "../../src/config/prisma.js";

export async function seedDivisions() {
    console.log("Seeding division...");

    await prisma.divisions.createMany({
        data: [
            { id: crypto.randomUUID(), name: "IT" },
            { id: crypto.randomUUID(), name: "Legal" },
            { id: crypto.randomUUID(), name: "Operasional" },
            { id: crypto.randomUUID(), name: "HRD" },
            { id: crypto.randomUUID(), name: "Marketing" },
            { id: crypto.randomUUID(), name: "Accounting" },
            { id: crypto.randomUUID(), name: "Finance" },
        ],
        skipDuplicates: true,
    });

    console.log("Division seeded!");
}