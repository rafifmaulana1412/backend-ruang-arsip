const express = require('express')
const router = express.Router();
const controller = require('./role.controller')
const validate = require("../../middlewares/validate.middleware");
const {
    createRoleSchema,
    updateRoleSchema,
} = require("./role.validation");


router.get('/', controller.getAll)
router.post("/", validate(createRoleSchema), controller.create);
router.get("/:id", controller.getById);
router.put("/:id", validate(updateRoleSchema), controller.update);
router.delete("/:id", controller.delete);

module.exports = router