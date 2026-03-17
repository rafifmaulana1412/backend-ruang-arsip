const service = require('./auth.service')
const { paginatedResponse, successResponse } = require('../../utils/response')

exports.login = async (req, res) => {


    try {
        const result = await service.login(req.body);
        successResponse(res, result);
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}



