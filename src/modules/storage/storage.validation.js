const Joi = require("joi");

exports.createStorageSchema = Joi.object({
    code: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .required()
        .messages({
            "string.empty": "Storage code is required",
            "string.min": " Storage code must be at least 3 characters",
            "string.max": "Storage code must not exceed 50 characters",
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .required()
        .messages({
            "string.empty": "Storage name is required",
            "string.min": " Storage name must be at least 3 characters",
            "string.max": "Storage name must not exceed 50 characters",
        }),
    office_code: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .optional(),
    office_label: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .optional(),
    capacity: Joi.string()
        .optional(),
    is_active: Joi.boolean()
        .required()
        .messages({
            "string.empty": "Storage is_active is required",
        }),
});

exports.updateStorageSchema = Joi.object({
    code: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .optional(),
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .optional(),
    is_active: Joi.boolean()
        .optional(),
    office_code: Joi.string()
        .trim()
        .optional(),
    office_label: Joi.string()
        .trim()
        .optional(),
    capacity: Joi.string()
        .trim()
        .optional(),
});