const Joi = require("joi");

exports.createRoleSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .required()
        .messages({
            "string.empty": "Role name is required",
            "string.min": "Role name must be at least 3 characters",
            "string.max": "Role name must not exceed 50 characters",
        }),
});

exports.updateRoleSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .optional(),
});