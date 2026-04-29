const express = require("express");
const router = express.Router();
const controller = require("./letterPriority.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
  createLetterPrioritySchema,
  updateLetterPrioritySchema,
} = require("./letterPriority.validation");

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createLetterPrioritySchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put(
  "/:id",
  auth,
  validate(updateLetterPrioritySchema),
  controller.update,
);
router.delete("/:id", auth, controller.delete);

module.exports = router;
