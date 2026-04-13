const prisma = require('../../config/prisma');

exports.findMany = () => {
    return prisma.outgoing_mails.findMany({
        where: { deleted_at: null },
        orderBy: { id: "desc" },
        include: {
            letter_prioritie: true,
            creator: true
        }
    });
};

exports.findById = (id) => {
    return prisma.outgoing_mails.findFirst({
        where: { id, deleted_at: null },
        include: {
            letter_prioritie: true
        }
    });
};

exports.create = (data) => {
    return prisma.outgoing_mails.create(
        {
            data,
            include: {
                letter_prioritie: true,
                creator: true
            }
        });
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
