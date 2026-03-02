import prisma from "../../src/config/prisma.js";

export async function seedRoles() {
    console.log("Seeding roles...");

    await prisma.roles.createMany({
        data: [
            { id: crypto.randomUUID(), name: "admin" },
            { id: crypto.randomUUID(), name: "admin" },
            { id: crypto.randomUUID(), name: "user" },
        ],
        skipDuplicates: true,
    });

    console.log("Roles seeded!");
}