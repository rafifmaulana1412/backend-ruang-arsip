const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const controller = require("./correspondence.controller");

const router = express.Router();

router.get("/report", auth, controller.getReport);
router.get("/print-documents", auth, controller.getPrintableDocuments);

module.exports = router;
