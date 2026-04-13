const Joi = require("joi");

exports.createOutgoingMailSchema = Joi.object({
    letter_prioritie_id: Joi.string().required().messages({
        "string.empty": "Letter priority ID is required"
    }),
    delivery_media: Joi.string().valid('email', 'pos', 'kurir', 'lainnya').required().messages({
        "string.empty": "Delivery media is required",
        "any.only": "Delivery media must be one of: email, pos, kurir, lainnya"
    }),
    name: Joi.string().required().messages({
        "string.empty": "Name is required"
    }),
    send_date: Joi.date().iso().required().messages({
        "date.base": "Send date must be a valid date",
        "any.required": "Send date is required"
    }),
    address: Joi.string().required().messages({
        "string.empty": "Address is required"
    }),
    mail_number: Joi.string().required().messages({
        "string.empty": "Mail number is required"
    }),
    file: Joi.string().allow('', null).optional(),
    status: Joi.number().integer().min(0).max(3).default(0)
});

exports.updateOutgoingMailSchema = Joi.object({
    letter_prioritie_id: Joi.string().optional(),
    delivery_media: Joi.string().valid('email', 'pos', 'kurir', 'lainnya').optional(),
    name: Joi.string().optional(),
    send_date: Joi.date().iso().optional(),
    address: Joi.string().optional(),
    mail_number: Joi.string().optional(),
    file: Joi.string().allow('', null).optional(),
    status: Joi.number().integer().min(0).max(3).optional()
});
