const express = require('express')
const router = express.Router();
const controller = require('./incomingMail.controller')
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { createIncomingMailSchema, updateIncomingMailSchema } = require('./incomingMail.validation')


router.get('/', auth, controller.getAll)
router.post("/", auth, validate(createIncomingMailSchema), controller.create);
router.post("/with-disposition", auth, validate(createIncomingMailSchema), controller.createWithDispo);
router.get("/:id", auth, controller.getById);
router.post("/:id/redispose", auth, controller.redispose);
router.patch("/:id/complete", auth, controller.complete);
router.put("/:id", auth, validate(updateIncomingMailSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router