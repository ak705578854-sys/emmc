const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    // ============================================================
    // HOSPITAL ID
    // ============================================================

    hospitalId: {
      type: String,
      unique: true,
      index: true,
      required: true,
      trim: true,
      uppercase: true,
    },

    // ============================================================
    // ORGANIZATION DETAILS
    // ============================================================

    organizationName: {
      type: String,
      default: "",
      trim: true,
    },

    hospitalType: {
      type: String,
      default: "",
      trim: true,
    },

    ownershipType: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================================
    // ADDRESS
    // ============================================================

    address: {
      addressLine: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        default: "",
        trim: true,
      },

      district: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // ============================================================
    // LEGAL REGISTRATION
    // ============================================================

    registrationNumber: {
      type: String,
      default: "",
      trim: true,
    },

    registrationAuthority: {
      type: String,
      default: "",
      trim: true,
    },

    registrationDate: {
      type: String,
      default: "",
    },

    // ============================================================
    // AUTHORIZED REPRESENTATIVE
    // ============================================================

    authorizedRepresentative: {
      name: {
        type: String,
        default: "",
        trim: true,
      },

      designation: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        lowercase: true,
        trim: true,
      },
    },

    // ============================================================
    // TAX / IDENTIFICATION
    // ============================================================

    gstNumber: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    // ============================================================
    // EMERGENCY DETAILS
    // ============================================================

    emergencyContact: {
      type: String,
      default: "",
      trim: true,
    },

    ambulanceAvailable: {
      type: Boolean,
      default: false,
    },

    emergencyServices: {
      type: Boolean,
      default: false,
    },

    // ============================================================
    // BED DETAILS
    // ============================================================

    bedCapacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    icuBeds: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ============================================================
    // EMAIL
    //
    // IMPORTANT:
    // Email is OPTIONAL.
    //
    // We intentionally DO NOT use:
    // unique: true
    // sparse: true
    //
    // Duplicate email checking is handled manually inside
    // hospitalController.js only when an email is actually given.
    // ============================================================

    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },

    // ============================================================
    // PASSWORD
    // ============================================================

    passwordHash: {
      type: String,
      default: null,
    },

    passwordCreated: {
      type: Boolean,
      default: false,
    },

    // ============================================================
    // STATUS
    // ============================================================

    status: {
      type: String,
      enum: [
        "pending_password",
        "pending_verification",
        "verified",
        "rejected",
      ],
      default: "pending_password",
    },

    // ============================================================
    // ROLE
    // ============================================================

    role: {
      type: String,
      default: "hospital",
      enum: ["hospital"],
    },

    // ============================================================
    // DECLARATION
    // ============================================================

    declarationAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// GENERATE HOSPITAL ID
// ============================================================

const generateHospitalId = async () => {
  const Hospital = mongoose.model("Hospital");

  let hospitalId;
  let exists = true;

  while (exists) {
    const number = Math.floor(
      100000 + Math.random() * 900000
    );

    hospitalId = `HOS-${number}`;

    exists = await Hospital.exists({
      hospitalId,
    });
  }

  return hospitalId;
};

// ============================================================
// PRE-VALIDATE
// ============================================================

hospitalSchema.pre("validate", async function () {
  // ------------------------------------------------------------
  // Generate Hospital ID automatically
  // ------------------------------------------------------------

  if (!this.hospitalId) {
    this.hospitalId = await generateHospitalId();
  }

  // ------------------------------------------------------------
  // Convert blank email to null
  // ------------------------------------------------------------

  if (
    typeof this.email === "string" &&
    this.email.trim() === ""
  ) {
    this.email = null;
  }

  // ------------------------------------------------------------
  // Normalize authorized representative email
  // ------------------------------------------------------------

  if (
    this.authorizedRepresentative &&
    typeof this.authorizedRepresentative.email === "string"
  ) {
    this.authorizedRepresentative.email =
      this.authorizedRepresentative.email
        .trim()
        .toLowerCase();
  }

  // ------------------------------------------------------------
  // Keep blank representative email as empty string
  // ------------------------------------------------------------

  if (
    this.authorizedRepresentative &&
    this.authorizedRepresentative.email === ""
  ) {
    this.authorizedRepresentative.email = "";
  }
});

// ============================================================
// EXPORT
// ============================================================

module.exports = mongoose.model(
  "Hospital",
  hospitalSchema
);