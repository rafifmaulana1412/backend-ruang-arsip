const prisma = require('../../config/prisma')


exports.findMany = ({ where, skip, take }) => {
    return prisma.storages.findMany({
        where, skip, take, orderBy: { id: "desc" }
    })
};

exports.count = (where) => {
    return prisma.storages.count({ where })
}

exports.findById = (id) => {
    return prisma.storages.findUnique({ where: { id } })
}

exports.findByName = (name) => {
    return prisma.storages.findFirst({ where: { name } })
}

exports.create = (data) => {
    return prisma.storages.create({ data })
}


exports.update = (id, data) => {
    return prisma.storages.update({
        where: { id },
        data,
    })
}

exports.delete = (id) => {
    return prisma.storages.delete({
        where: { id }
    })
}