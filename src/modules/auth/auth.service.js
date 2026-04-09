const repository = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwt");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");

exports.login = async (payload) => {
  const user = await repository.findByUsername(payload.username);
  if (!user) throw new Error("Invalid username or password");

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) throw new Error("Invalid username or password");

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    username: user.username,
    role_id: user.role_id,
    division_id: user.division_id,
    role: {
      role_name: user.role?.name,
    },
    division: {
      division_name: user.division?.name,
    },
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
  });

  await repository.update(user.id, {
    refresh_token: refreshToken,
  });
  return {
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      division_id: user.division_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: {
        role_name: user.role?.name,
      },
      division: {
        division_name: user.division?.name,
      },
    },
    token,
    refreshToken,
  };
};

exports.refreshToken = async (token) => {
  if (!token) {
    throw new Error("Refresh token required");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid refress token");
  }

  const user = await repository.findById(decoded.id);
  if (!user || user.refresh_token !== token) {
    throw new Error("Token tidak valids");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    username: user.username,
    role_id: user.role_id,
    division_id: user.division_id,
  });

  return {
    token: newAccessToken,
  };
};

exports.changePassword = async (userId, payload) => {
  const { oldPassword, newPassword } = payload;

  const user = await repository.findById(userId);

  const match = await comparePassword(oldPassword, user.password);

  if (!match) {
    throw new Error("Password lama salah");
  }

  const hashed = await hashPassword(newPassword);

  await repository.update(userId, {
    password: hashed,
  });

  return true;
};

exports.logout = async (userId) => {
  await repository.update(userId, {
    refresh_token: null,
  });

  return true;
};


