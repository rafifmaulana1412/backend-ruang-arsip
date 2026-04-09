const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
    createUserSchema,
    updateUserSchema,
} = require("./user.validation");

router.get('/', auth, controller.getAll);
router.get("/me", auth, controller.getMe);
router.post("/", auth, validate(createUserSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateUserSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;

