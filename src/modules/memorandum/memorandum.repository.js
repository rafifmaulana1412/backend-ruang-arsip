const prisma = require('../../config/prisma');

exports.findMany = (query) => {
    return prisma.memorandums.findMany({
        ...query,
        include: {
            division: true,
            creator: true,
            dispositions: {
                include: {
                    receiver: true,
                    sender: true
                }
            }
        },
        orderBy: { id: "desc" }
    });
};

exports.count = (where) => {
    return prisma.memorandums.count({ where });
};

exports.findById = (id) => {
    return prisma.memorandums.findFirst({
        where: { id, deleted_at: null },
        include: {
            division: true,
            creator: true,
            dispositions: {
                include: {
                    receiver: true,
                    sender: true
                }
            }
        }
    });
};

exports.createWithInitialReceivers = async (data, receiversData) => {
    return await prisma.$transaction(async (tx) => {
        const memo = await tx.memorandums.create({
            data
        });

        const dispositions = receiversData.map(disp => ({
            memorandums_id: memo.id,
            receiver_id: disp.receiver_id,
            sender_id: disp.sender_id
        }));

        await tx.memorandum_dispositions.createMany({
            data: dispositions
        });

        return tx.memorandums.findUnique({
            where: { id: memo.id },
            include: { dispositions: true }
        });
    });
};

exports.createDisposition = (data) => {
    return prisma.memorandum_dispositions.create({
        data
    });
};

exports.update = (id, data) => {
    return prisma.memorandums.update({
        where: { id },
        data,
    });
};

exports.delete = (id, deleted_by) => {
    return prisma.memorandums.update({
        where: { id },
        data: {
            deleted_by,
            deleted_at: new Date()
        }
    });
};
