const prisma = require('../../config/prisma');

exports.findMany = () => {
    return prisma.digital_documents.findMany({
        where: { deleted_at: null },
        orderBy: { id: "desc" },
    });
};

exports.findById = (id) => {
    return prisma.digital_documents.findFirst({
        where: { id, deleted_at: null }
    });
};

exports.create = (data) => {
    return prisma.digital_documents.create({ data });
};

exports.update = (id, data) => {
    return prisma.digital_documents.update({
        where: { id },
        data,
    });
};

exports.delete = (id, deleted_by) => {
    return prisma.digital_documents.update({
        where: { id },
        data: {
            deleted_by,
            deleted_at: new Date()
        }
    });
};
