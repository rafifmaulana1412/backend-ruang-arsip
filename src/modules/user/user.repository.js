const prisma = require('../../config/prisma');

exports.findMany = ({ where, skip, take }) => {
    return prisma.users.findMany({
        where,
        skip,
        take,
        orderBy: { created_at: 'desc' },
        include: {
            role: true,
            division: true,
        },
    });
};

exports.count = (where) => {
    return prisma.users.count({ where });
};

exports.findById = (id) => {
    return prisma.users.findUnique({
        where: { id },
        include: {
            role: true,
            division: true,
        },
    });
};

exports.findByEmail = (email) => {
    return prisma.users.findFirst({
        where: { email },
    });
};

exports.findByUsername = (username) => {
    return prisma.users.findFirst({
        where: { username },
    });
};

exports.create = (data) => {
    return prisma.users.create({ data });
};

exports.update = (id, data) => {
    return prisma.users.update({
        where: { id },
        data,
    });
};

exports.delete = (id) => {
    return prisma.users.delete({
        where: { id },
    });
};

