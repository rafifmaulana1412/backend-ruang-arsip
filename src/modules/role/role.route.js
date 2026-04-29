const express = require("express");
const router = express.Router();
const controller = require("./role.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { createRoleSchema, updateRoleSchema } = require("./role.validation");

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createRoleSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateRoleSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
