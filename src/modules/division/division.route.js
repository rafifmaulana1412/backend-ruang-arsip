const express = require('express')
const router = express.Router();
const controller = require('./division.controller')
const validate = require("../../middlewares/validate.middleware");
const {
    createDivisionSchema,
    updateDivisionSchema,
} = require("./division.validation");


router.get('/', controller.getAll)
router.post("/", validate(createDivisionSchema), controller.create);
router.get("/:id", controller.getById);
router.put("/:id", validate(updateDivisionSchema), controller.update);
router.delete("/:id", controller.delete);

module.exports = router