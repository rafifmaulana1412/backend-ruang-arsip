const service = require('./user.service');
const { paginatedResponse, successResponse } = require('../../utils/response');
const bcrypt = require('bcrypt')

exports.getAll = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await service.getUsers({ page, limit, search });
        paginatedResponse(res, result.data, result.meta);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            messsage: error.messsage,
        });
    }
};

exports.getById = async (req, res) => {

    try {
        const result = await service.getUserById(req.params.id);
        successResponse(res, result);
    } catch (error) {
        res.status(400).json({
            status: false,
            messsage: error.messsage,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const payload = { ...req.body };

        if (payload.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
        }

        const result = await service.createUser(payload);
        return res.status(201).json({
            status: true,
            data: result,
            messsage: "User created successfully",
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const payload = { ...req.body };

        if (payload.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
        }
        const result = await service.updateUser(req.params.id, payload);
        return res.status(200).json({
            status: true,
            messsage: "User updated successfully",
            data: result,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        await service.deleteUser(req.params.id);
        successResponse(res, null, "User deleted successfully");
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await service.getProfile(userId);
        successResponse(res, data);
    } catch (error) {
        res.status(400).json({
            status: false,
            messsage: error.messsage,
        });
    }
}

