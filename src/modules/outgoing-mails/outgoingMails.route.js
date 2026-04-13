const express = require('express');
const router = express.Router();
const controller = require('./outgoingMails.controller');
const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createOutgoingMailSchema, updateOutgoingMailSchema } = require("./outgoingMails.validation");

// Using big Payload size in body-parser for base64

router.get('/', auth, controller.getAll);
router.post("/", auth, validate(createOutgoingMailSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateOutgoingMailSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
