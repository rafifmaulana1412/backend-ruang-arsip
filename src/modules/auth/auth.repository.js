const prisma = require("../../config/prisma");

exports.findByUsername = (username) => {
  return prisma.users.findFirst({
    where: { username },
    include: {
      role: true,
      division: true,
    },
  })
};

exports.findById = (id) => {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
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
