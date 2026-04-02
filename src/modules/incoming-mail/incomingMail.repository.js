const prisma = require('../../config/prisma')


exports.findMany = ({ where, skip, take }) => {
    return prisma.incoming_mails.findMany({
        where, skip, take, orderBy: { id: "desc" },
        include: {
            disposition_mails: {
                include: {
                    disposition: true
                }
            }
        }
    })
};

exports.count = (where) => {
    return prisma.incoming_mails.count({ where })
}

exports.findById = (id) => {
    return prisma.incoming_mails.findUnique({
        where: { id },
        include: {
            disposition_mails: {
                include: {
                    disposition: true
                }
            }
        }
    })
}

exports.findByName = (name) => {
    return prisma.incoming_mails.findFirst({ where: { name } })
}

exports.create = (data) => {
    return prisma.incoming_mails.create({ data })
}

exports.createWithDiposition = async (data, dispositionsData) => {
    return await prisma.incoming_mails.create({
        data: {
            ...data,
            disposition_mails: {
                create: dispositionsData
            }
        },
        include: {
            disposition_mails: true
        }
    })
}




exports.update = (id, data) => {
    return prisma.incoming_mails.update({
        where: { id },
        data,
    })
}

exports.delete = (id) => {
    return prisma.incoming_mails.delete({
        where: { id }
    })
}