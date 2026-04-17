const Joi = require("joi");

exports.createUserSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Name is required",
        }),
    username: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Username is required",
        }),
    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
    phone: Joi.string()
        .trim()
        .optional(),
    is_active: Joi.boolean()
        .optional(),
    is_restrict: Joi.boolean()
        .optional(),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
    role_id: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Role is required",
        }),
    division_id: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Division is required",
        }),
});

exports.updateUserSchema = Joi.object({
    name: Joi.string()
        .trim()
        .optional(),
    username: Joi.string()
        .trim()
        .optional(),
    email: Joi.string()
        .email()
        .trim()
        .optional(),
    phone: Joi.string()
        .trim()
        .optional(),
    is_active: Joi.boolean()
        .optional(),
    is_restrict: Joi.boolean()
        .optional(),
    password: Joi.string()
        .min(6)
        .optional(),
    role_id: Joi.string()
        .trim()
        .optional(),
    division_id: Joi.string()
        .trim()
        .optional(),
});

