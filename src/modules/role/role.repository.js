const prisma = require('../../config/prisma')


exports.findMany = ({ where, skip, take }) => {
    return prisma.roles.findMany({
        where, skip, take, orderBy: { id: "desc" }
    })
};

exports.count = (where) => {
    return prisma.roles.count({ where })
}

exports.findById = (id) => {
    return prisma.roles.findUnique({ where: { id } })
}

exports.findByName = (name) => {
    return prisma.roles.findFirst({ where: { name } })
}

exports.create = (data) => {
    return prisma.roles.create({ data })
}


exports.update = (id, data) => {
    return prisma.roles.update({
        where: { id },
        data,
    })
}

exports.delete = (id) => {
    return prisma.roles.delete({
        where: { id }
    })
}

exports.assignMenus = async (roleId, menusData) => {
    // Delete existing
    await prisma.role_menus.deleteMany({
        where: { role_id: roleId }
    });
    
    // Insert new
    if (menusData && menusData.length > 0) {
        return prisma.role_menus.createMany({
            data: menusData.map(m => ({
                role_id: roleId,
                menu_id: m.menu_id,
                can_create: !!m.can_create,
                can_read: !!m.can_read,
                can_update: !!m.can_update,
                can_delete: !!m.can_delete
            }))
        });
    }
    return { count: 0 };
}