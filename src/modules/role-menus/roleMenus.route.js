const express = require("express");
const router = express.Router();
const controller = require("./roleMenus.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
  createRoleMenuSchema,
  updateRoleMenuSchema,
} = require("./roleMenus.validation");

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createRoleMenuSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateRoleMenuSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
