const Joi = require("joi");

exports.authSchema = Joi.object({
    username: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Username is required",
        }),
    password: Joi.string()
        .min(6)
        .trim()
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
});

