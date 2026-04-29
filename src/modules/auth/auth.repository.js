const prisma = require("../../config/prisma");

const authUserSelect = {
  id: true,
  role_id: true,
  division_id: true,
  name: true,
  username: true,
  email: true,
  password: true,
  created_at: true,
  updated_at: true,
  refresh_token: true,
  is_active: true,
  is_restrict: true,
  phone: true,
  email_verified_at: true,
  password_set_at: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
  division: {
    select: {
      id: true,
      name: true,
    },
  },
};

exports.findByUsername = (username) => {
  return prisma.users.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: authUserSelect,
  });
};

exports.findByEmail = (email) => {
  return prisma.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
    select: authUserSelect,
  });
};

exports.findById = (id) => {
  return prisma.users.findUnique({
    where: { id },
    select: authUserSelect,
  });
};

function findActionToken(tokenHash, type) {
  return prisma.auth_action_tokens.findFirst({
    where: {
      token_hash: tokenHash,
      type,
      used_at: null,
      expires_at: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: authUserSelect,
      },
    },
  });
}

exports.findInviteActionToken = (tokenHash) => {
  return findActionToken(tokenHash, "INVITE");
};

exports.findResetPasswordActionToken = (tokenHash) => {
  return findActionToken(tokenHash, "RESET_PASSWORD");
};

function invalidateActionTokens(userId, type, usedAt) {
  return prisma.auth_action_tokens.updateMany({
    where: {
      user_id: userId,
      type,
      used_at: null,
    },
    data: {
      used_at: usedAt,
    },
  });
}

exports.invalidateInviteTokens = (userId, usedAt) => {
  return invalidateActionTokens(userId, "INVITE", usedAt);
};

exports.invalidateResetPasswordTokens = (userId, usedAt) => {
  return invalidateActionTokens(userId, "RESET_PASSWORD", usedAt);
};

exports.createActionToken = (data) => {
  return prisma.auth_action_tokens.create({
    data,
  });
};

exports.createInviteToken = (data) => {
  return exports.createActionToken(data);
};

exports.markActionTokenUsed = (id, usedAt) => {
  return prisma.auth_action_tokens.update({
    where: { id },
    data: {
      used_at: usedAt,
    },
  });
};

exports.update = (id, data) => {
  return prisma.users.update({
    where: { id },
    data,
  });
};

exports.completeInviteOnboarding = async ({
  tokenId,
  userId,
  password,
  now,
}) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.update({
      where: { id: userId },
      data: {
        password,
        password_set_at: now,
        email_verified_at: now,
        refresh_token: null,
      },
      select: authUserSelect,
    });

    await tx.auth_action_tokens.update({
      where: { id: tokenId },
      data: {
        used_at: now,
      },
    });

    return user;
  });
};

exports.completePasswordReset = async ({
  tokenId,
  userId,
  password,
  now,
  emailVerifiedAt,
}) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.update({
      where: { id: userId },
      data: {
        password,
        password_set_at: now,
        refresh_token: null,
        ...(emailVerifiedAt ? { email_verified_at: emailVerifiedAt } : {}),
      },
      select: authUserSelect,
    });

    await tx.auth_action_tokens.updateMany({
      where: {
        user_id: userId,
        type: "RESET_PASSWORD",
        used_at: null,
      },
      data: {
        used_at: now,
      },
    });

    return user;
  });
};
