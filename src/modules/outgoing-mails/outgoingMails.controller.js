const service = require('./outgoingMails.service');

exports.getAll = async (req, res) => {
    try {
        const result = await service.getAll();
        return res.status(200).json({ status: true, data: result, message: "Success" });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const result = await service.getById(req.params.id);
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const result = await service.create(req.body, userId);
        return res.status(201).json({ status: true, data: result, message: "Outgoing Mail created successfully" });
    } catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const result = await service.update(req.params.id, req.body, userId);
        return res.status(200).json({ status: true, message: "Outgoing Mail updated successfully", data: result });
    } catch (err) {
        return res.status(400).json({ status: false, message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        await service.delete(req.params.id, userId);
        return res.status(200).json({ status: true, message: "Outgoing Mail deleted successfully", data: null });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
