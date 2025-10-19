const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/auth");
const { requireAuth, requireRole } = require("../middleware/requireAuth");

router.get("/trips", tripsController.tripsList);
router.get("/trips/:tripCode", tripsController.tripsFindByCode);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
  "/trips",
  requireAuth,
  requireRole("admin"),
  tripsController.tripsCreate
);
router.put(
  "/trips/:tripCode",
  requireAuth,
  requireRole("admin"),
  tripsController.tripsUpdateByCode
);
router.delete(
  "/trips/:tripCode",
  requireAuth,
  requireRole("admin"),
  tripsController.tripsDeleteByCode
);

module.exports = router;
