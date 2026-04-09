const service = require('./role.service')
const { paginatedResponse, successResponse } = require('../../utils/response')
exports.getAll = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const result = await service.getRoles({ page, limit, search })
        paginatedResponse(res, result.data, result.meta);
    } catch (error) {
        res.status(400).json({
            success: false,
            messsage: error.messsage
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const result = await service.getRoleById(req.params.id)
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
        const result = await service.createRole(req.body);
        return res.status(201).json({
            status: true,
            data: result,
            messsage: "Role created successfully",
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
        const result = await service.updateRole(req.params.id, req.body);
        return res.status(200).json({
            status: true,
            messsage: "Role updated successfully",
            data: result,
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
};

exports.delete = async (req, res) => {
    try {
        await service.deleteRole(req.params.id)
        successResponse(res, null, "Role deleted successfully")
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.assignMenus = async (req, res) => {
    try {
        const result = await service.assignMenus(req.params.id, req.body.menus);
        return res.status(200).json({
            status: true,
            message: "Menus assigned successfully",
            data: result,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
};


