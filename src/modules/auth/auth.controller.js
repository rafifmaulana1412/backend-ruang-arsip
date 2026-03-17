const service = require("./auth.service");
const { paginatedResponse, successResponse } = require("../../utils/response");

exports.login = async (req, res) => {
  try {
    const result = await service.login(req.body);
    successResponse(res, result);
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await service.refreshToken(refreshToken);
    successResponse(res, result);
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await service.logout(req.user.id);

    res.json({
      status: true,
      message: "Logout berhasil",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    await service.changePassword(req.user.id, req.body);

    res.json({
      status: true,
      message: "Password berhasil diubah",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
