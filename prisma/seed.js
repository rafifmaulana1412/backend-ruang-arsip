import "../src/config/env.js";
import { seedRoles } from "./seed/roles.seeder.js";
import { seedDivisions } from "./seed/division.seeder.js";
import { seedLetterPriorities } from "./seed/letter_priorities.seeder.js";
import { seedUsers } from "./seed/users.seeder.js";
import { seedMenus } from "./seed/menus.seeder.js";
import { seedRoleMenus } from "./seed/role_menus.seeder.js";
import prisma from "../src/config/prisma.js";

async function main() {
    await seedRoles();
    await seedDivisions();
    await seedLetterPriorities();
    await seedUsers();
    await seedMenus();
    await seedRoleMenus();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});