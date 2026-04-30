import prisma from "../../src/config/prisma.js";

export async function seedRoleMenus() {
  console.log("Seeding role menus...");
  await prisma.role_menus.deleteMany();

  const menus = await prisma.menus.findMany();
  const roles = await prisma.roles.findMany();
  
  const roleMenus = [];
  
  for (const role of roles) {
    for (const menu of menus) {
      let can_create = false;
      let can_read = false;
      let can_update = false;
      let can_delete = false;

      if (role.name === "IT" || role.name === "Admin") {
        can_create = true;
        can_read = true;
        can_update = true;
        can_delete = true;
      } else if (role.name === "Legal" && (menu.name.includes("Legal") || menu.name.includes("Arsip") || menu.name === "Dashboard")) {
        can_create = true;
        can_read = true;
        can_update = true;
        can_delete = false;
      } else if (role.name === "Manajer") {
        can_create = false;
        can_read = true;
        can_update = true;
        can_delete = false;
      }

      if (menu.name === "Dashboard") {
        can_read = true;
      }

      if (can_read) {
         roleMenus.push({
           id: crypto.randomUUID(),
           role_id: role.id,
           menu_id: menu.id,
           can_create,
           can_read,
           can_update,
           can_delete,
         });
      }
    }
  }

  if (roleMenus.length > 0) {
    await prisma.role_menus.createMany({
      data: roleMenus,
      skipDuplicates: true,
    });
  }

  console.log("Role menus seeded!");
}
