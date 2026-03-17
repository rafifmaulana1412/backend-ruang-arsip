const express = require('express')
const router = express.Router();
const controller = require('./division.controller')
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const {
    createDivisionSchema,
    updateDivisionSchema,
} = require("./division.validation");


router.get('/', auth, controller.getAll)
router.post("/", auth, validate(createDivisionSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, validate(updateDivisionSchema), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router