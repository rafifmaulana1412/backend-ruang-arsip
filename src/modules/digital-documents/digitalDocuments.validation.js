const Joi = require("joi");

const uuid = Joi.string().uuid();

const createDigitalDocumentSchema = Joi.object({
  storage_id: uuid.required(),
  document_type_id: uuid.required(),
  document_name: Joi.string().trim().min(3).max(255).required(),
  description: Joi.string().trim().allow("", null).optional(),
  is_restricted: Joi.boolean().default(false),
  file: Joi.any().required(),
});

const updateDigitalDocumentSchema = Joi.object({
  storage_id: uuid.optional(),
  document_type_id: uuid.optional(),
  document_name: Joi.string().trim().min(3).max(255).optional(),
  description: Joi.string().trim().allow("", null).optional(),
  is_restricted: Joi.boolean().optional(),
  file: Joi.any().optional(),
});

module.exports = {
  createDigitalDocumentSchema,
  updateDigitalDocumentSchema,
};
