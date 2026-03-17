const prisma = require('../../config/prisma')


exports.findMany = ({ where, skip, take }) => {
    return prisma.document_types.findMany({
        where, skip, take, orderBy: { id: "desc" }
    })
};

exports.count = (where) => {
    return prisma.document_types.count({ where })
}

exports.findById = (id) => {
    return prisma.document_types.findUnique({ where: { id } })
}

exports.findByName = (name) => {
    return prisma.document_types.findFirst({ where: { name } })
}

exports.create = (data) => {
    return prisma.document_types.create({ data })
}


exports.update = (id, data) => {
    return prisma.document_types.update({
        where: { id },
        data,
    })
}

exports.delete = (id) => {
    return prisma.document_types.delete({
        where: { id }
    })
}