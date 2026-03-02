exports.successResponse = (res, data, message = "Success") => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};

exports.paginatedResponse = (res, data, meta) => {
    res.status(200).json({
        success: true,
        ...meta,
        data,
    });
};