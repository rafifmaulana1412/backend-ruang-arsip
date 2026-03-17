const service = require('./letterPriority.service.')
const { paginatedResponse, successResponse } = require('../../utils/response')
exports.getAll = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await service.getLetterPriorities({ page, limit, search })
        paginatedResponse(res, result.data, result.meta);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messsage: error.messsage
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const result = await service.getLetterPriorityById(req.params.id)
        successResponse(res, result)
    } catch (error) {
        res.status(400).json({
            status: false,
            messsage: error.messsage
        })
    }
}


exports.create = async (req, res) => {
    try {
        const result = await service.createLetterPriority(req.body);
        return res.status(201).json({
            status: true,
            data: result,
            messsage: "Letter priority created successfully",
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
};

exports.update = async (req, res) => {
    try {
        const result = await service.updateLetterPriority(req.params.id, req.body);
        return res.status(200).json({
            status: true,
            messsage: "Letter priority updated successfully",
            data: result,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
};

exports.delete = async (req, res) => {
    try {
        await service.deleteLetterPriority(req.params.id)
        successResponse(res, null, "Letter priority deleted successfully")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


