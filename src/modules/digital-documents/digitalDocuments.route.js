const express = require('express');
const router = express.Router();
const controller = require('./digitalDocuments.controller');
const auth = require("../../middlewares/auth.middleware");

// Using big Payload size in body-parser for base64
// We can use express.json({limit: '50mb'}) inside app.js 
// So this is just standard routes implementation

router.get('/', auth, controller.getAll);
router.post("/", auth, controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
