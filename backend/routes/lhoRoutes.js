const express = require("express");

const {
  registerLHO,
  createLHOPassword,
  loginLHO,
} = require("../controllers/lhoController.js");

const router = express.Router();


// Register LHO
router.post(
  "/register",
  registerLHO
);


// Create password
router.post(
  "/create-password",
  createLHOPassword
);


// Login
router.post(
  "/login",
  loginLHO
);


module.exports = router;