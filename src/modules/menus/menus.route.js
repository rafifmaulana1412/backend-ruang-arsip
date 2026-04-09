const express = require('express');
const router = express.Router();
const controller = require('./menus.controller');
const auth = require("../../middlewares/auth.middleware");

// Validation middleware can be added here if needed

router.get('/', auth, controller.getAll);
router.post("/", auth, controller.create);
router.get("/:id", auth, controller.getById);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
