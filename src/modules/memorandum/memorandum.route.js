const express = require('express');
const router = express.Router();
const controller = require('./memorandum.controller');
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { createMemorandumSchema, updateMemorandumSchema, redisposeMemorandumSchema } = require('./memorandum.validation');

router.get('/', auth, controller.getAll);
router.post("/", auth, validate(createMemorandumSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.post("/:id/redispose", auth, validate(redisposeMemorandumSchema), controller.redispose);
router.patch("/:id/complete", auth, controller.complete);
router.put("/:id", auth, validate(updateMemorandumSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
