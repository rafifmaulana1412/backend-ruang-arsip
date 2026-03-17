const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const auth = require("../../middlewares/auth.middleware");
const { authSchema } = require("./auth.validation");

router.post("/login", validate(authSchema), controller.login);
router.post("/refresh", controller.refresh);
router.post("/logout", auth, controller.logout);
router.post("/change-password", auth, controller.changePassword);
module.exports = router;
