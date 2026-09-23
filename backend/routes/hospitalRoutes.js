const express = require("express");

const {
  registerHospital,
  createHospitalPassword,
  loginHospital,
} = require("../controllers/hospitalController.js");

const router = express.Router();


// =====================================================
// HOSPITAL REGISTRATION
// =====================================================

router.post(
  "/register",
  registerHospital
);


// =====================================================
// CREATE PASSWORD
// =====================================================

router.post(
  "/create-password",
  createHospitalPassword
);


// =====================================================
// LOGIN
// =====================================================

router.post(
  "/login",
  loginHospital
);


module.exports = router;