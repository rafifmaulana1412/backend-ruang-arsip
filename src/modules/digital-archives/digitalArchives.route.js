const express = require("express");

const auth = require("../../middlewares/auth.middleware");
const controller = require("./digitalArchives.controller");

const router = express.Router();

router.get("/storage/offices", auth, controller.getStorageSummary);
router.get(
  "/storage/offices/:officeId/cabinets",
  auth,
  controller.getOfficeCabinets,
);
router.get(
  "/storage/cabinets/:cabinetId/racks",
  auth,
  controller.getCabinetRacks,
);
router.get(
  "/storage/racks/:rackId/documents",
  auth,
  controller.getRackDocuments,
);
router.get("/histories/storage", auth, controller.getStorageHistories);
router.get(
  "/histories/access-requests",
  auth,
  controller.getAccessRequestHistories,
);
router.get("/histories/loans", auth, controller.getLoanHistories);
router.get("/reports/loans", auth, controller.getLoanReport);
router.get("/reports/overdue", auth, controller.getOverdueLoans);

module.exports = router;
