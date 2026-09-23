const express = require("express");

const {
  registerPatient,
  createPatientPassword,
  loginPatient,
  getMe,
  logoutPatient,
} = require("../controllers/patientController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Patient registration
router.post(
  "/register",
  registerPatient
);

// Create password after registration
router.post(
  "/create-password",
  createPatientPassword
);

// Patient login
router.post(
  "/login",
  loginPatient
);

// Patient logout
router.post(
  "/logout",
  logoutPatient
);

// ==========================================
// PROTECTED ROUTES
// ==========================================

router.get(
  "/me",
  protect,
  getMe
);

module.exports = router;