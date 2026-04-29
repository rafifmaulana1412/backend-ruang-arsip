const express = require("express");
const router = express.Router();
const controller = require("./menus.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { createMenuSchema, updateMenuSchema } = require("./menus.validation");

router.get("/", auth, controller.getAll);
router.post(
  "/",
  auth,
  validate(createMenuSchema, { abortEarly: false }),
  controller.create,
);
router.get("/:id", auth, controller.getById);
router.put(
  "/:id",
  auth,
  validate(updateMenuSchema, { abortEarly: false }),
  controller.update,
);
router.delete("/:id", auth, controller.delete);

module.exports = router;
