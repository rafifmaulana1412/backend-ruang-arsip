const express = require("express");
const router = express.Router();
const controller = require("./memorandum.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
  normalizePersuratanMultipartBody,
  uploadPersuratanFile,
} = require("../../middlewares/persuratan-upload.middleware");
const {
  createMemorandumSchema,
  updateMemorandumSchema,
  redisposeMemorandumSchema,
  updateMemorandumDispositionStatusSchema,
} = require("./memorandum.validation");

router.get("/", auth, controller.getAll);
router.post(
  "/with-disposition",
  auth,
  uploadPersuratanFile("file"),
  validate(createMemorandumSchema),
  controller.createWithDisposition,
);
router.get("/:id", auth, controller.getById);
router.post(
  "/:id/redispose",
  auth,
  validate(redisposeMemorandumSchema),
  controller.redispose,
);
router.patch(
  "/:id/dispositions/:dispositionId/status",
  auth,
  validate(updateMemorandumDispositionStatusSchema),
  controller.updateDispositionStatus,
);
router.patch("/:id/complete", auth, controller.complete);
router.put(
  "/:id",
  auth,
  uploadPersuratanFile("file"),
  normalizePersuratanMultipartBody({
    numberFields: ["status"],
  }),
  validate(updateMemorandumSchema),
  controller.update,
);
router.delete("/:id", auth, controller.delete);

module.exports = router;
