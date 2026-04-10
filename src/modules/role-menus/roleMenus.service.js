const repository = require('./roleMenus.repository');

exports.getRoleMenus = async ({ page, limit, role_id }) => {
    const skip = (page - 1) * limit;

    const where = role_id ? { role_id } : {};

    const [data, total] = await Promise.all([
        repository.findMany({ where, skip, take: limit }),
        repository.count(where),
    ]);

    return {
        data,
        meta: {
            total,
            page,
            lastPage: Math.ceil(total / limit),
        },
    };
};

exports.getRoleMenuById = async (id) => {
    const roleMenu = await repository.findById(id);
    if (!roleMenu) throw new Error("Role Menu not found");
    return roleMenu;
};

exports.createRoleMenu = async (payload) => {
    const existing = await repository.findByRoleAndMenu(payload.role_id, payload.menu_id);
    if (existing) {
        throw new Error("This role already has access to this menu.");
    }
    return repository.create(payload);
};

exports.updateRoleMenu = async (id, payload) => {
    const roleMenu = await repository.findById(id);
    if (!roleMenu) throw new Error("Role Menu not found");

    if (payload.role_id && payload.menu_id) {
        const existing = await repository.findByRoleAndMenu(payload.role_id, payload.menu_id);
        if (existing && existing.id !== id) {
            throw new Error("This role already has access to this menu.");
        }
    }

    return repository.update(id, payload);
};

exports.deleteRoleMenu = async (id) => {
    const roleMenu = await repository.findById(id);
    if (!roleMenu) throw new Error("Role Menu not found");
    return repository.delete(id);
};
