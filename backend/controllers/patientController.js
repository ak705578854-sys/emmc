const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Patient = require("../models/Patient");

// ==========================================
// GENERATE JWT TOKEN
// ==========================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "emmc_jwt_secret_key",
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// SEND AUTH TOKEN
// ==========================================

const sendAuthToken = (
  patient,
  statusCode,
  res,
  message
) => {
  const token = generateToken(patient._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,

    secure:
      process.env.NODE_ENV === "production",

    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  };

  res.cookie(
    "emmc_token",
    token,
    cookieOptions
  );

  return res.status(statusCode).json({
    success: true,

    message,

    token,

    patient: {
      patientId: patient.patientId,
      name: patient.name,
      email: patient.email,
      role: patient.role,
      phone: patient.phone,
      serviceType: patient.serviceType,
      age: patient.age,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      bloodGroup: patient.bloodGroup,
    },
  });
};

// ==========================================
// REGISTER PATIENT
// ==========================================
// POST /api/patients/register
// ==========================================

const registerPatient = async (
  req,
  res
) => {
  try {
    const {
      name,
      fullName,
      email,
      phone,
      mobile,
      dob,
      dateOfBirth,
      age,
      gender,
      governmentId,
      village,
      block,
      district,
      state,
      pincode,
      language,
      serviceArea,
      bloodGroup,
      emName,
      emRelation,
      emPhone,
      emNote,
      consent1,
      consent2,
      consent3,
    } = req.body;

    // ========================================
    // RESOLVE VALUES
    // ========================================

    const resolvedName = (
      name ||
      fullName ||
      ""
    ).trim();

    const resolvedEmail = (
      email ||
      ""
    )
      .trim()
      .toLowerCase();

    const resolvedPhone = (
      phone ||
      mobile ||
      ""
    ).trim();

    // ========================================
    // VALIDATION
    // ========================================

    if (!resolvedName) {
      return res.status(400).json({
        success: false,
        message:
          "Patient name is required.",
      });
    }

    if (!resolvedEmail) {
      return res.status(400).json({
        success: false,
        message:
          "Email is required.",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(resolvedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid email address.",
      });
    }

    // ========================================
    // DUPLICATE CHECK
    // ========================================

    const duplicateConditions = [
      {
        email: resolvedEmail,
      },
    ];

    if (resolvedPhone) {
      duplicateConditions.push({
        phone: resolvedPhone,
      });
    }

    const existingPatient =
      await Patient.findOne({
        $or: duplicateConditions,
      });

    if (existingPatient) {
      if (
        existingPatient.email ===
        resolvedEmail
      ) {
        return res.status(409).json({
          success: false,
          message:
            "An account with this email already exists.",
        });
      }

      return res.status(409).json({
        success: false,
        message:
          "An account with this phone number already exists.",
      });
    }

    // ========================================
    // CREATE PATIENT
    // ========================================
    // Password is NOT created here.
    // User will create it in the next step.
    // ========================================

    const newPatient =
      await Patient.create({
        name: resolvedName,

        email: resolvedEmail,

        passwordHash: null,

        passwordCreated: false,

        role: "Patient",

        phone: resolvedPhone,

        dateOfBirth:
          dob ||
          dateOfBirth ||
          null,

        age:
          age !== undefined &&
          age !== ""
            ? Number(age)
            : undefined,

        gender: gender || "",

        governmentId:
          governmentId || "",

        serviceType:
          serviceArea === "Rural"
            ? "Rural Service"
            : "Urban Service",

        language:
          language || "en",

        bloodGroup:
          bloodGroup ||
          "Not Specified",

        address: {
          village:
            village || "",

          block:
            block || "",

          district:
            district || "",

          state:
            state || "",

          pincode:
            pincode || "",
        },

        emergencyContact: {
          name:
            emName || "",

          relation:
            emRelation || "",

          phone:
            emPhone || "",

          note:
            emNote || "",
        },

        consents: {
          treatmentConsent:
            !!consent1,

          teleconsultConsent:
            !!consent2,

          careFollowupConsent:
            !!consent3,
        },
      });

    // ========================================
    // RESPONSE
    // ========================================

    return res.status(201).json({
      success: true,

      message:
        "Registration completed. Please create your password.",

      patientId:
        newPatient.patientId,

      user: {
        patientId:
          newPatient.patientId,

        name:
          newPatient.name,

        email:
          newPatient.email,

        role: "patient",

        passwordCreated: false,
      },
    });
  } catch (error) {
    console.error(
      "[Register Patient Error]:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Internal server error during patient registration.",

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

// ==========================================
// CREATE PASSWORD
// ==========================================
// POST /api/patients/create-password
// ==========================================

const createPatientPassword =
  async (req, res) => {
    try {
      const {
        patientId,
        password,
        confirmPassword,
      } = req.body;

      // ======================================
      // VALIDATE PATIENT ID
      // ======================================

      const cleanPatientId = (
        patientId || ""
      )
        .trim()
        .toUpperCase();

      if (!cleanPatientId) {
        return res.status(400).json({
          success: false,
          message:
            "Patient ID is required.",
        });
      }

      if (
        !cleanPatientId.startsWith(
          "PAT-"
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid Patient ID.",
        });
      }

      // ======================================
      // VALIDATE PASSWORD
      // ======================================

      if (!password) {
        return res.status(400).json({
          success: false,
          message:
            "Password is required.",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters long.",
        });
      }

      if (
        confirmPassword !== undefined &&
        password !== confirmPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Passwords do not match.",
        });
      }

      // ======================================
      // FIND PATIENT
      // ======================================

      const patient =
        await Patient.findOne({
          patientId:
            cleanPatientId,
        });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message:
            "Patient account not found.",
        });
      }

      // ======================================
      // CHECK IF PASSWORD ALREADY EXISTS
      // ======================================

      if (
        patient.passwordCreated &&
        patient.passwordHash
      ) {
        return res.status(409).json({
          success: false,
          message:
            "Password has already been created for this Patient ID.",
        });
      }

      // ======================================
      // HASH PASSWORD
      // ======================================

      const salt =
        await bcrypt.genSalt(10);

      const passwordHash =
        await bcrypt.hash(
          password,
          salt
        );

      // ======================================
      // SAVE PASSWORD
      // ======================================

      patient.passwordHash =
        passwordHash;

      patient.passwordCreated =
        true;

      await patient.save();

      // ======================================
      // SUCCESS
      // ======================================

      return res.status(200).json({
        success: true,

        message:
          "Password created successfully.",

        patient: {
          patientId:
            patient.patientId,

          name:
            patient.name,

          email:
            patient.email,

          role: "patient",

          passwordCreated: true,
        },
      });
    } catch (error) {
      console.error(
        "[Create Password Error]:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Server error while creating password.",
      });
    }
  };

// ==========================================
// PATIENT LOGIN
// ==========================================
// POST /api/patients/login
// ==========================================

const loginPatient = async (
  req,
  res
) => {
  try {
    const {
      patientId,
      userId,
      password,
      role,
    } = req.body;

    const cleanPatientId = (
      patientId ||
      userId ||
      ""
    )
      .trim()
      .toUpperCase();

    // ========================================
    // VALIDATION
    // ========================================

    if (!cleanPatientId) {
      return res.status(400).json({
        success: false,
        message:
          "Patient ID is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          "Password is required.",
      });
    }

    // ========================================
    // ROLE CHECK
    // ========================================

    if (
      role &&
      role.toLowerCase() !==
        "patient"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid account type.",
      });
    }

    // ========================================
    // FIND PATIENT
    // ========================================

    const patient =
      await Patient.findOne({
        patientId:
          cleanPatientId,
      });

    if (!patient) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Patient ID or Password.",
      });
    }

    // ========================================
    // PASSWORD CREATED?
    // ========================================

    if (
      !patient.passwordHash ||
      !patient.passwordCreated
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Password has not been created yet. Please complete registration first.",
      });
    }

    // ========================================
    // VERIFY PASSWORD
    // ========================================

    const isMatch =
      await bcrypt.compare(
        password,
        patient.passwordHash
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Patient ID or Password.",
      });
    }

    // ========================================
    // LOGIN SUCCESS
    // ========================================

    return sendAuthToken(
      patient,
      200,
      res,
      "Logged in successfully."
    );
  } catch (error) {
    console.error(
      "[Patient Login Error]:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during patient login.",
    });
  }
};

// ==========================================
// GET CURRENT PATIENT
// ==========================================
// GET /api/patients/me
// ==========================================

const getMe = async (
  req,
  res
) => {
  try {
    return res.status(200).json({
      success: true,
      patient: req.patient,
    });
  } catch (error) {
    console.error(
      "[Profile Error]:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve profile data.",
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================
// POST /api/patients/logout
// ==========================================

const logoutPatient = (
  req,
  res
) => {
  res.cookie(
    "emmc_token",
    "",
    {
      httpOnly: true,

      expires: new Date(0),

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      secure:
        process.env.NODE_ENV ===
        "production",
    }
  );

  return res.status(200).json({
    success: true,

    message:
      "Logged out successfully.",
  });
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  registerPatient,
  createPatientPassword,
  loginPatient,
  getMe,
  logoutPatient,
};