const prisma = require('../../config/prisma')


exports.findMany = ({ where, skip, take }) => {
    return prisma.divisions.findMany({
        where, skip, take, orderBy: { id: "desc" }
    })
};

exports.count = (where) => {
    return prisma.divisions.count({ where })
}

exports.findById = (id) => {
    return prisma.divisions.findUnique({ where: { id } })
}

exports.findByName = (name) => {
    return prisma.divisions.findFirst({ where: { name } })
}

exports.create = (data) => {
    return prisma.divisions.create({ data })
}


exports.update = (id, data) => {
    return prisma.divisions.update({
        where: { id },
        data,
    })
}

exports.delete = (id) => {
    return prisma.divisions.delete({
        where: { id }
    })
}