const repository = require("./menus.repository");

const buildMenuTree = (menus, parentId = null) => {
  return menus
    .filter((menu) => menu.parent_id === parentId)
    .map((menu) => ({
      ...menu,
      children: buildMenuTree(menus, menu.id),
    }));
};

exports.getAllMenus = async () => {
  const menus = await repository.findMany();
  return buildMenuTree(menus, null);
};

exports.getMenuById = async (id) => {
  const menu = await repository.findById(id);
  if (!menu) throw new Error("Menu not found");
  return menu;
};

exports.createMenu = async (payload) => {
  return repository.create(payload);
};

exports.updateMenu = async (id, payload) => {
  const menu = await repository.findById(id);
  if (!menu) throw new Error("Menu not found");
  return repository.update(id, payload);
};

exports.deleteMenu = async (id) => {
  const menu = await repository.findById(id);
  if (!menu) throw new Error("Menu not found");
  return repository.delete(id);
};
