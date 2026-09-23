const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const protect = async (req, res, next) => {
  try {
    let token = req.cookies.emmc_token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findById(decoded.id).select("-passwordHash");

    if (!patient) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Patient no longer exists",
      });
    }

    req.patient = patient;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = { protect };
