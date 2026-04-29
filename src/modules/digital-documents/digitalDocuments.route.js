const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {
  uploadDigitalArchiveFile,
} = require("../../middlewares/digital-archive-upload.middleware");
const controller = require("./digitalDocuments.controller");
const {
  createDigitalDocumentSchema,
  updateDigitalDocumentSchema,
} = require("./digitalDocuments.validation");

const router = express.Router();

router.get("/", auth, controller.getAll);
router.post(
  "/",
  auth,
  uploadDigitalArchiveFile("file"),
  validate(createDigitalDocumentSchema),
  controller.create,
);
router.get("/:id", auth, controller.getById);
router.get("/:id/activity-logs", auth, controller.getActivityLogs);
router.put(
  "/:id",
  auth,
  uploadDigitalArchiveFile("file"),
  validate(updateDigitalDocumentSchema),
  controller.update,
);
router.delete("/:id", auth, controller.delete);

module.exports = router;
