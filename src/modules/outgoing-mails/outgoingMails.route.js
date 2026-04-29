const express = require("express");
const router = express.Router();
const controller = require("./outgoingMails.controller");
const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {
  normalizePersuratanMultipartBody,
  uploadPersuratanFile,
} = require("../../middlewares/persuratan-upload.middleware");
const {
  createOutgoingMailSchema,
  updateOutgoingMailSchema,
} = require("./outgoingMails.validation");

router.get("/", auth, controller.getAll);
router.post(
  "/",
  auth,
  uploadPersuratanFile("file"),
  validate(createOutgoingMailSchema),
  controller.create,
);
router.get("/:id", auth, controller.getById);
router.put(
  "/:id",
  auth,
  uploadPersuratanFile("file"),
  normalizePersuratanMultipartBody({
    numberFields: ["status"],
  }),
  validate(updateOutgoingMailSchema),
  controller.update,
);
router.delete("/:id", auth, controller.delete);

module.exports = router;
