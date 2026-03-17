const prisma = require("../../config/prisma");

exports.findByUsername = (username) => {
  return prisma.users.findFirst({ where: { username } });
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

exports.update = (id, data) => {
  return prisma.users.update({
    where: { id },
    data,
  });
};
