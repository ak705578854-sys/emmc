const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LHO = require("../models/LHO");


/* =========================================================
   JWT
========================================================= */

const generateToken = (lho) => {
  return jwt.sign(
    {
      id: lho._id,
      lhoId: lho.lhoId,
      role: "lho",
    },
    process.env.JWT_SECRET || "emmc_jwt_secret_key",
    {
      expiresIn: "7d",
    }
  );
};


/* =========================================================
   REGISTER LHO
========================================================= */

const registerLHO = async (req, res) => {
  try {
    const {
      organization,
      representative,
      verification,
      identity,
    } = req.body;

    const org = organization || {};
    const rep = representative || {};
    const ver = verification || {};
    const idn = identity || {};


    // Check email if supplied
    if (org.email) {
      const existingEmail = await LHO.findOne({
        email: org.email.toLowerCase().trim(),
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "An LHO with this email already exists.",
        });
      }
    }


    const lho = new LHO({
      organizationName: org.name || "",
      organizationType: org.type || "",
      locality: org.locality || "",
      address: org.address || "",
      district: org.district || "",
      state: org.state || "",
      pincode: org.pincode || "",
      phone: org.phone || "",
      email: org.email || "",
      website: org.website || "",

      emergencyServices:
        org.emergencyServices === "Yes",

      ambulanceAvailable:
        org.ambulanceAvailable === "Yes",

      ambulanceCount:
        Number(org.ambulanceCount) || 0,

      representative: {
        name: rep.name || "",
        designation: rep.designation || "",
        phone: rep.phone || "",
        email: rep.email || "",
        role: rep.role || "",
        authLetterFileName:
          rep.authLetterFileName || "",
      },

      verification: {
        certType: ver.certType || "",
        certNumber: ver.certNumber || "",
        issuingAuthority:
          ver.issuingAuthority || "",
        issueDate: ver.issueDate || "",
        validUntil: ver.validUntil || "",
        certFileName:
          ver.certFileName || "",
      },

      identityVerified:
        idn.verified === true,

      status: "pending_password",
      passwordCreated: false,
    });


    await lho.save();


    return res.status(201).json({
      success: true,
      message: "LHO registration successful.",
      lhoId: lho.lhoId,
      status: lho.status,
    });

  } catch (error) {
    console.error("LHO registration error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to register LHO.",
    });
  }
};


/* =========================================================
   CREATE PASSWORD
========================================================= */

const createLHOPassword = async (req, res) => {
  try {
    let { lhoId, password } = req.body;


    if (!lhoId || !password) {
      return res.status(400).json({
        success: false,
        message: "LHO ID and password are required.",
      });
    }


    lhoId = lhoId.trim().toUpperCase();


    // Accept both LHO123456 and LHO-123456
    if (/^LHO\d{6}$/.test(lhoId)) {
      lhoId = `LHO-${lhoId.slice(3)}`;
    }


    if (!/^LHO-\d{6}$/.test(lhoId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid LHO ID format.",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long.",
      });
    }


    const lho = await LHO.findOne({ lhoId });


    if (!lho) {
      return res.status(404).json({
        success: false,
        message: "LHO account not found.",
      });
    }


    if (lho.passwordCreated) {
      return res.status(409).json({
        success: false,
        message:
          "Password has already been created for this LHO account.",
      });
    }


    const passwordHash = await bcrypt.hash(
      password,
      12
    );


    lho.passwordHash = passwordHash;
    lho.passwordCreated = true;
    lho.status = "pending_verification";


    await lho.save();


    return res.status(200).json({
      success: true,
      message: "Password created successfully.",
      lhoId: lho.lhoId,
    });

  } catch (error) {
    console.error(
      "LHO create password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to create password.",
    });
  }
};


/* =========================================================
   LOGIN LHO
========================================================= */

const loginLHO = async (req, res) => {
  try {
    let { lhoId, userId, password } = req.body;


    const loginId = lhoId || userId;


    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message:
          "LHO ID and password are required.",
      });
    }


    let normalizedId =
      loginId.trim().toUpperCase();


    // Accept LHO123456
    if (/^LHO\d{6}$/.test(normalizedId)) {
      normalizedId =
        `LHO-${normalizedId.slice(3)}`;
    }


    if (!/^LHO-\d{6}$/.test(normalizedId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid LHO ID.",
      });
    }


    const lho = await LHO.findOne({
      lhoId: normalizedId,
    });


    if (!lho) {
      return res.status(401).json({
        success: false,
        message: "Invalid LHO ID or password.",
      });
    }


    if (
      !lho.passwordCreated ||
      !lho.passwordHash
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Password has not been created for this LHO account.",
      });
    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        lho.passwordHash
      );


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid LHO ID or password.",
      });
    }


    const token = generateToken(lho);


    res.cookie(
      "emmc_token",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      }
    );


    return res.status(200).json({
      success: true,
      message: "LHO login successful.",

      token,

      user: {
        id: lho._id,
        lhoId: lho.lhoId,
        organizationName:
          lho.organizationName,
        role: "lho",
        status: lho.status,
      },
    });

  } catch (error) {
    console.error(
      "LHO login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to login.",
    });
  }
};


module.exports = {
  registerLHO,
  createLHOPassword,
  loginLHO,
};