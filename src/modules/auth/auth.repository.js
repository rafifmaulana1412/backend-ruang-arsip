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
      refresh_token: true,
      is_active: true,
      is_restrict: true,
      phone: true,
      role: {
        select: {
          id: true,
          name: true,
        }
      },
      division: {
        select: {
          id: true,
          name: true,
        }
      }
    },
  });
};

exports.update = (id, data) => {
  return prisma.users.update({
    where: { id },
    data,
  });
};
