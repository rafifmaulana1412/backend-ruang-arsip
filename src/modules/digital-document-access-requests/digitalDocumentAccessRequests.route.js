const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const controller = require("./digitalDocumentAccessRequests.controller");
const {
  approveAccessRequestSchema,
  createAccessRequestSchema,
  rejectAccessRequestSchema,
} = require("./digitalDocumentAccessRequests.validation");

const router = express.Router();

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createAccessRequestSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.patch(
  "/:id/approve",
  auth,
  validate(approveAccessRequestSchema),
  controller.approve,
);
router.patch(
  "/:id/reject",
  auth,
  validate(rejectAccessRequestSchema),
  controller.reject,
);

module.exports = router;
