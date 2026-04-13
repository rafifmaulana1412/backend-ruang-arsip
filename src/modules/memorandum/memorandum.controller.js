const service = require('./memorandum.service');
const { paginatedResponse, successResponse } = require('../../utils/response');

exports.getAll = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await service.getMemorandums({ page, limit, search, userId: req.user.id });
        paginatedResponse(res, result.data, result.meta);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const result = await service.getMemorandumById(req.params.id);
        successResponse(res, result);
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

exports.create = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const result = await service.createMemorandum(req.body, userId);
        return res.status(201).json({
            status: true,
            data: result,
            message: "Memorandum created successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const result = await service.updateMemorandum(req.params.id, req.body, userId);
        return res.status(200).json({
            status: true,
            message: "Memorandum updated successfully",
            data: result,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        await service.deleteMemorandum(req.params.id, userId);
        successResponse(res, null, "Memorandum deleted successfully");
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.redispose = async (req, res) => {
    try {
        const senderId = req.user ? req.user.id : null;
        const result = await service.redispose(req.params.id, req.body, senderId);
        return res.status(201).json({
            status: true,
            data: result,
            message: "Memorandum redisposed successfully",
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};

exports.complete = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const result = await service.completeMemorandum(req.params.id, userId);
        return res.status(200).json({
            status: true,
            data: result,
            message: "Memorandum marked as completed",
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};
