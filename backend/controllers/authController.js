const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// GENERATE USER ID
// ==========================================

const generateUserId = (role) => {
  const prefixes = {
    ambulance: "AMB",
    doctor: "DOC",
    hospital: "HOS",
    police: "POL",
    lho: "LHO",
  };

  const prefix =
    prefixes[role];

  if (!prefix) {
    throw new Error(
      "Invalid role for User ID generation."
    );
  }

  const number = Math.floor(
    100000 +
      Math.random() * 900000
  );

  return `${prefix}-${number}`;
};

// ==========================================
// SIGN IN / CREATE ACCOUNT
// ==========================================
// Used for non-patient legacy accounts.
// Patient registration is handled through
// /api/patients/register.
// ==========================================

const signin = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const cleanRole = (
      role || ""
    )
      .toLowerCase()
      .trim();

    // ========================================
    // ALLOWED ROLES
    // ========================================

    if (
      ![
        "hospital",
        "lho",
      ].includes(cleanRole)
    ) {
      return res.status(400).json({
        success: false,

        message:
          "This registration endpoint is available for Hospital and LHO.",
      });
    }

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,

        message:
          "All fields are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,

        message:
          "Password must be at least 6 characters long.",
      });
    }

    // ========================================
    // CLEAN EMAIL
    // ========================================

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    // ========================================
    // CHECK EMAIL
    // ========================================

    const exists =
      await User.findOne({
        email: cleanEmail,
      });

    if (exists) {
      return res.status(400).json({
        success: false,

        message:
          "Email already registered.",
      });
    }

    // ========================================
    // GENERATE UNIQUE ID
    // ========================================

    let userId;

    do {
      userId =
        generateUserId(
          cleanRole
        );
    } while (
      await User.findOne({
        userId,
      })
    );

    // ========================================
    // HASH PASSWORD
    // ========================================

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    // ========================================
    // CREATE USER
    // ========================================

    const user =
      await User.create({
        userId,

        name:
          name.trim(),

        email:
          cleanEmail,

        password:
          hashed,

        role:
          cleanRole,
      });

    // ========================================
    // RESPONSE
    // ========================================

    return res.status(201).json({
      success: true,

      message:
        "Registered Successfully.",

      userId:
        user.userId,

      role:
        user.role,

      user: {
        userId:
          user.userId,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      },
    });
  } catch (err) {
    console.error(
      "SIGNIN ERROR:",
      err
    );

    return res.status(500).json({
      success: false,

      message:
        err.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

const login = async (
  req,
  res
) => {
  try {
    const {
      userId,
      email,
      password,
      role,
    } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    if (!password) {
      return res.status(400).json({
        success: false,

        message:
          "Password is required.",
      });
    }

    if (!userId && !email) {
      return res.status(400).json({
        success: false,

        message:
          "Login ID is required.",
      });
    }

    // ========================================
    // PATIENT LOGIN
    // ========================================
    // Patient accounts are stored in Patient
    // collection and use /api/patients/login.
    // ========================================

    if (
      userId &&
      userId
        .trim()
        .toUpperCase()
        .startsWith("PAT-")
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Please use the Patient login system for a PAT ID.",
      });
    }

    // ========================================
    // FIND USER
    // ========================================

    const query = userId
      ? {
          userId:
            userId
              .trim()
              .toUpperCase(),
        }
      : {
          email:
            email
              .trim()
              .toLowerCase(),
        };

    const user =
      await User.findOne(query);

    if (!user) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid Login ID or Password.",
      });
    }

    // ========================================
    // VERIFY ROLE
    // ========================================

    const requestedRole = (
      role || ""
    )
      .toLowerCase()
      .trim();

    if (
      requestedRole &&
      user.role !==
        requestedRole
    ) {
      return res.status(401).json({
        success: false,

        message:
          "Login ID does not belong to the selected Access Type.",
      });
    }

    // ========================================
    // VERIFY PASSWORD
    // ========================================

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid Login ID or Password.",
      });
    }

    // ========================================
    // JWT
    // ========================================

    const token =
      jwt.sign(
        {
          id: user._id,

          userId:
            user.userId,

          role:
            user.role,
        },

        process.env.JWT_SECRET ||
          "emmc_jwt_secret_key",

        {
          expiresIn: "1d",
        }
      );

    // ========================================
    // SUCCESS
    // ========================================

    return res.json({
      success: true,

      token,

      user: {
        userId:
          user.userId,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      },
    });
  } catch (err) {
    console.error(
      "LOGIN ERROR:",
      err
    );

    return res.status(500).json({
      success: false,

      message:
        err.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  signin,
  login,
};