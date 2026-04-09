const Joi = require("joi");

exports.createIncomingMailSchema = Joi.object({
    letter_prioritie_id: Joi.string().required().messages({
        "string.empty": "Letter priority ID is required"
    }),
    regarding: Joi.string().allow('', null).optional(),
    name: Joi.string().required().messages({
        "string.empty": "Name is required"
    }),

    receive_date: Joi.date().iso().required().messages({
        "date.base": "Receive date must be a valid date",
        "any.required": "Receive date is required"
    }),
    address: Joi.string().required().messages({
        "string.empty": "Address is required"
    }),
    mail_number: Joi.string().required().messages({
        "string.empty": "Mail number is required"
    }),
    file: Joi.string().allow('', null).optional(),
    description: Joi.string().allow('', null).optional(),
    is_active: Joi.boolean().optional(),
    dispositions: Joi.array().items(
        Joi.object({
            dispositions_id: Joi.string().required().messages({
                "string.empty": "Disposition ID is required"
            }),
            note: Joi.string().allow('', null).optional(),
            start_date: Joi.date().iso().allow(null).optional(),
            due_date: Joi.date().iso().allow(null).optional()
        })
    ).optional()
});

exports.updateIncomingMailSchema = Joi.object({
    letter_prioritie_id: Joi.string().optional(),
    regarding: Joi.string().allow('', null).optional(),
    name: Joi.string().optional(),
    receive_date: Joi.date().iso().optional(),
    address: Joi.string().optional(),
    mail_number: Joi.string().optional(),
    file: Joi.string().allow('', null).optional(),
    dispositions: Joi.array().items(
        Joi.object({
            dispositions_id: Joi.string().required(),
            note: Joi.string().allow('', null).optional(),
            start_date: Joi.date().iso().allow(null).optional(),
            due_date: Joi.date().iso().allow(null).optional()
        })
    ).optional(),
    status: Joi.number().integer().min(0).max(3).optional()
});