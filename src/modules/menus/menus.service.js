const repository = require('./menus.repository');

exports.getAllMenus = async () => {
    return await repository.findMany();
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
