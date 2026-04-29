const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const controller = require("./digitalDocumentLoans.controller");
const {
  approveLoanSchema,
  createLoanSchema,
  handoverLoanSchema,
  rejectLoanSchema,
  returnLoanSchema,
} = require("./digitalDocumentLoans.validation");

const router = express.Router();

router.get("/", auth, controller.getAll);
router.post("/", auth, validate(createLoanSchema), controller.create);
router.get("/:id", auth, controller.getById);
router.patch(
  "/:id/approve",
  auth,
  validate(approveLoanSchema),
  controller.approve,
);
router.patch(
  "/:id/reject",
  auth,
  validate(rejectLoanSchema),
  controller.reject,
);
router.patch(
  "/:id/handover",
  auth,
  validate(handoverLoanSchema),
  controller.handover,
);
router.patch(
  "/:id/return",
  auth,
  validate(returnLoanSchema),
  controller.returnLoan,
);

module.exports = router;
