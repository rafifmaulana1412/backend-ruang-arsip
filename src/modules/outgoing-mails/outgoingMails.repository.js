const prisma = require('../../config/prisma');

exports.findMany = () => {
    return prisma.outgoing_mails.findMany({
        where: { deleted_at: null },
        orderBy: { id: "desc" },
    });
};

exports.findById = (id) => {
    return prisma.outgoing_mails.findFirst({
        where: { id, deleted_at: null }
    });
};

exports.create = (data) => {
    return prisma.outgoing_mails.create({ data });
};

exports.update = (id, data) => {
    return prisma.outgoing_mails.update({
        where: { id },
        data,
    });
};

exports.delete = (id, deleted_by) => {
    return prisma.outgoing_mails.update({
        where: { id },
        data: {
            deleted_by,
            deleted_at: new Date()
        }
    });
};
