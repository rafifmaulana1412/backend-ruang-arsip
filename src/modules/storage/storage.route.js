const express = require("express");
const router = express.Router();
const controller = require("./storage.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
  createStorageSchema,
  updateStorageSchema,
} = require("./storage.validation");

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createStorageSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateStorageSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
