const express = require('express')
const router = express.Router();
const controller = require('./auth.controller')
const validate = require("../../middlewares/validate.middleware");
const {
    authSchema,
} = require("./auth.validation");



router.post("/", validate(authSchema), controller.login);

module.exports = router