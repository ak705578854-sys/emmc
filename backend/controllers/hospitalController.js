const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Hospital = require("../models/Hospital");


// =====================================================
// JWT
// =====================================================

const generateToken = (hospital) => {
  return jwt.sign(
    {
      id: hospital._id,
      hospitalId: hospital.hospitalId,
      role: "hospital",
    },
    process.env.JWT_SECRET || "emmc_jwt_secret_key",
    {
      expiresIn: "7d",
    }
  );
};


// =====================================================
// REGISTER HOSPITAL
// =====================================================

const registerHospital = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      organizationName = "",
      hospitalType = "",
      ownershipType = "",

      address = {},

      registrationNumber = "",
      registrationAuthority = "",
      registrationDate = "",

      authorizedRepresentative = {},

      gstNumber = "",
      panNumber = "",

      emergencyContact = "",

      ambulanceAvailable = false,
      emergencyServices = false,

      bedCapacity = 0,
      icuBeds = 0,

      email = "",

      declarationAccepted = false,
    } = body;


    // =================================================
    // NO USER FIELD IS REQUIRED
    // =================================================
    // Hospital ID is automatically generated.
    // Every other registration field can be empty.


    // =================================================
    // NORMALIZE EMAIL
    // =================================================
    //
    // IMPORTANT:
    // Empty email MUST become null.
    //
    // Do NOT save:
    // email: ""
    //
    // Save:
    // email: null
    //
    // This allows multiple hospitals without email.
    //

    const normalizedEmail =
      typeof email === "string" &&
      email.trim() !== ""
        ? email.trim().toLowerCase()
        : null;


    // =================================================
    // OPTIONAL EMAIL DUPLICATE CHECK
    // =================================================

    if (normalizedEmail) {
      const existingHospital =
        await Hospital.findOne({
          email: normalizedEmail,
        });

      if (existingHospital) {
        return res.status(409).json({
          success: false,
          message:
            "A hospital with this email already exists.",
        });
      }
    }


    // =================================================
    // CREATE HOSPITAL
    // =================================================

    const hospital = new Hospital({
      organizationName:
        organizationName || "",

      hospitalType:
        hospitalType || "",

      ownershipType:
        ownershipType || "",


      // =================================================
      // ADDRESS
      // =================================================

      address: {
        addressLine:
          address?.addressLine ||
          address?.address ||
          "",

        city:
          address?.city || "",

        district:
          address?.district || "",

        state:
          address?.state || "",

        pincode:
          address?.pincode || "",
      },


      // =================================================
      // LEGAL REGISTRATION
      // =================================================

      registrationNumber:
        registrationNumber || "",

      registrationAuthority:
        registrationAuthority || "",

      registrationDate:
        registrationDate || "",


      // =================================================
      // AUTHORIZED REPRESENTATIVE
      // =================================================

      authorizedRepresentative: {
        name:
          authorizedRepresentative?.name || "",

        designation:
          authorizedRepresentative?.designation || "",

        phone:
          authorizedRepresentative?.phone || "",

        email:
          authorizedRepresentative?.email || "",
      },


      // =================================================
      // SUPPORTING DETAILS
      // =================================================

      gstNumber:
        gstNumber || "",

      panNumber:
        panNumber || "",


      // =================================================
      // EMERGENCY
      // =================================================

      emergencyContact:
        emergencyContact || "",

      ambulanceAvailable:
        ambulanceAvailable === true ||
        ambulanceAvailable === "true" ||
        ambulanceAvailable === "Yes",

      emergencyServices:
        emergencyServices === true ||
        emergencyServices === "true" ||
        emergencyServices === "Yes",


      // =================================================
      // BED CAPACITY
      // =================================================

      bedCapacity:
        Number(bedCapacity) || 0,

      icuBeds:
        Number(icuBeds) || 0,


      // =================================================
      // EMAIL
      // =================================================

      email:
        normalizedEmail,


      // =================================================
      // DECLARATION
      // =================================================

      declarationAccepted:
        declarationAccepted === true ||
        declarationAccepted === "true",


      // =================================================
      // ACCOUNT STATUS
      // =================================================

      passwordCreated:
        false,

      status:
        "pending_password",

      role:
        "hospital",
    });


    // =================================================
    // SAVE
    // =================================================

    await hospital.save();


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message:
        "Hospital registration successful.",

      hospitalId:
        hospital.hospitalId,

      hospital: {
        id:
          hospital._id,

        hospitalId:
          hospital.hospitalId,

        organizationName:
          hospital.organizationName,

        email:
          hospital.email,

        status:
          hospital.status,

        role:
          hospital.role,
      },
    });

  } catch (error) {
    console.error(
      "Hospital registration error:",
      error
    );


    // =================================================
    // DUPLICATE KEY
    // =================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,

        message:
          "A hospital with this information already exists.",

        error:
          error.keyValue || null,
      });
    }


    // =================================================
    // GENERAL ERROR
    // =================================================

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to register hospital.",
    });
  }
};


// =====================================================
// CREATE HOSPITAL PASSWORD
// =====================================================

const createHospitalPassword = async (req, res) => {
  try {
    let {
      hospitalId,
      password,
    } = req.body;


    // =================================================
    // REQUIRED ONLY FOR PASSWORD CREATION
    // =================================================

    if (!hospitalId || !password) {
      return res.status(400).json({
        success: false,

        message:
          "Hospital ID and password are required.",
      });
    }


    // =================================================
    // NORMALIZE HOSPITAL ID
    // =================================================

    hospitalId =
      hospitalId
        .trim()
        .toUpperCase();


    /*
      Accept:

      HOS123456

      HOS-123456
    */

    if (/^HOS\d{6}$/.test(hospitalId)) {
      hospitalId =
        `HOS-${hospitalId.slice(3)}`;
    }


    // =================================================
    // VALIDATE ID
    // =================================================

    if (!/^HOS-\d{6}$/.test(hospitalId)) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid Hospital ID.",
      });
    }


    // =================================================
    // PASSWORD LENGTH
    // =================================================

    if (password.length < 6) {
      return res.status(400).json({
        success: false,

        message:
          "Password must be at least 6 characters long.",
      });
    }


    // =================================================
    // FIND HOSPITAL
    // =================================================

    const hospital =
      await Hospital.findOne({
        hospitalId,
      });


    if (!hospital) {
      return res.status(404).json({
        success: false,

        message:
          "Hospital account not found.",
      });
    }


    // =================================================
    // CHECK EXISTING PASSWORD
    // =================================================

    if (hospital.passwordCreated) {
      return res.status(409).json({
        success: false,

        message:
          "Password has already been created for this hospital.",
      });
    }


    // =================================================
    // HASH PASSWORD
    // =================================================

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );


    // =================================================
    // SAVE PASSWORD
    // =================================================

    hospital.passwordHash =
      passwordHash;

    hospital.passwordCreated =
      true;

    hospital.status =
      "pending_verification";


    await hospital.save();


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message:
        "Hospital password created successfully.",

      hospitalId:
        hospital.hospitalId,
    });

  } catch (error) {
    console.error(
      "Hospital create password error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to create hospital password.",
    });
  }
};


// =====================================================
// LOGIN HOSPITAL
// =====================================================

const loginHospital = async (req, res) => {
  try {
    let {
      hospitalId,
      userId,
      password,
    } = req.body;


    // =================================================
    // LOGIN ID
    // =================================================

    const loginId =
      hospitalId || userId;


    if (!loginId || !password) {
      return res.status(400).json({
        success: false,

        message:
          "Hospital ID and password are required.",
      });
    }


    // =================================================
    // NORMALIZE ID
    // =================================================

    let normalizedId =
      loginId
        .trim()
        .toUpperCase();


    // Accept:

    // HOS123456

    if (/^HOS\d{6}$/.test(normalizedId)) {
      normalizedId =
        `HOS-${normalizedId.slice(3)}`;
    }


    // =================================================
    // VALIDATE ID
    // =================================================

    if (!/^HOS-\d{6}$/.test(normalizedId)) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid Hospital ID.",
      });
    }


    // =================================================
    // FIND HOSPITAL
    // =================================================

    const hospital =
      await Hospital.findOne({
        hospitalId: normalizedId,
      });


    if (!hospital) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid Hospital ID or password.",
      });
    }


    // =================================================
    // PASSWORD CREATED?
    // =================================================

    if (
      !hospital.passwordCreated ||
      !hospital.passwordHash
    ) {
      return res.status(403).json({
        success: false,

        message:
          "Password has not been created for this hospital.",
      });
    }


    // =================================================
    // CHECK PASSWORD
    // =================================================

    const passwordMatch =
      await bcrypt.compare(
        password,
        hospital.passwordHash
      );


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid Hospital ID or password.",
      });
    }


    // =================================================
    // GENERATE TOKEN
    // =================================================

    const token =
      generateToken(hospital);


    // =================================================
    // COOKIE
    // =================================================

    res.cookie(
      "emmc_token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );


    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message:
        "Hospital login successful.",

      token,

      user: {
        id:
          hospital._id,

        hospitalId:
          hospital.hospitalId,

        organizationName:
          hospital.organizationName,

        role:
          "hospital",

        status:
          hospital.status,
      },
    });

  } catch (error) {
    console.error(
      "Hospital login error:",
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


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  registerHospital,
  createHospitalPassword,
  loginHospital,
};