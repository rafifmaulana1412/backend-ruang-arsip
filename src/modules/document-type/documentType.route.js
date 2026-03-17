const express = require('express')
const router = express.Router();
const controller = require('./documentType.controller')
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { createDocumentTypeSchema, updateDocumentTypeSchema } = require('./documentType.validation')


router.get('/', auth, controller.getAll)
router.post("/", auth, validate(createDocumentTypeSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateDocumentTypeSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router