
import "dotenv/config";
import { seedRoles } from "./seed/roles.seeder.js";
import { seedDivisions } from "./seed/division.seeder.js";
import prisma from "../src/config/prisma.js";
import { seedLetterPriorities } from "./seed/letter_priorities.seeder.js";
async function main() {
    await seedRoles()
    await seedDivisions()
    await seedLetterPriorities()
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});