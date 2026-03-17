const prisma = require('../../config/prisma')


exports.findByUsername = (username) => {
    return prisma.users.findFirst({ where: { username } })
}

