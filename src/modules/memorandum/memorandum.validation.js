const Joi = require("joi");

exports.createMemorandumSchema = Joi.object({
    division_id: Joi.string().required().messages({
        "string.empty": "Division ID is required"
    }),
    memo_number: Joi.string().required().messages({
        "string.empty": "Memo number is required"
    }),
    memo_date: Joi.date().iso().required().messages({
        "date.base": "Memo date must be a valid date",
        "any.required": "Memo date is required"
    }),
    received_date: Joi.date().iso().required().messages({
        "date.base": "Received date must be a valid date",
        "any.required": "Received date is required"
    }),
    due_date: Joi.date().iso().allow(null).optional(),
    regarding: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    file: Joi.string().allow('', null).optional(),
    status: Joi.number().integer().min(0).max(3).optional(),
    receivers: Joi.array().items(
        Joi.object({
            receiver_id: Joi.string().required(),
            due_date: Joi.date().iso().allow(null).optional()
        })
    ).min(1).required().messages({
        "array.min": "At least one receiver (user_id) is required",
        "any.required": "Receivers are required"
    })
});

exports.updateMemorandumSchema = Joi.object({
    division_id: Joi.string().optional(),
    memo_number: Joi.string().optional(),
    memo_date: Joi.date().iso().optional(),
    received_date: Joi.date().iso().optional(),
    due_date: Joi.date().iso().allow(null).optional(),
    regarding: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    file: Joi.string().allow('', null).optional(),
    status: Joi.number().integer().min(0).max(3).optional()
});

exports.redisposeMemorandumSchema = Joi.object({
    receiver_id: Joi.string().required().messages({
        "string.empty": "Receiver ID is required"
    }),
    note: Joi.string().allow('', null).optional(),
    start_date: Joi.date().iso().allow(null).optional(),
    due_date: Joi.date().iso().allow(null).optional()
});
