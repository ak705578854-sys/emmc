const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // ==========================================
    // PATIENT ID
    // ==========================================

    patientId: {
      type: String,
      unique: true,
      index: true,
      required: true,
      trim: true,
      uppercase: true,
    },

    // ==========================================
    // CORE REGISTRATION
    // ==========================================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // Password is created AFTER registration
    passwordHash: {
      type: String,
      default: null,
    },

    passwordCreated: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // ROLE
    // ==========================================

    role: {
      type: String,
      default: "Patient",
      enum: ["Patient"],
    },

    // ==========================================
    // DEMOGRAPHICS & CONTACT
    // ==========================================

    phone: {
      type: String,
      trim: true,
      sparse: true,
    },

    altPhone: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    age: {
      type: Number,
      min: 0,
      max: 130,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    governmentId: {
      type: String,
      trim: true,
    },

    // ==========================================
    // ADDRESS
    // ==========================================

    address: {
      village: {
        type: String,
        default: "",
      },

      block: {
        type: String,
        default: "",
      },

      district: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },
    },

    // ==========================================
    // CLINICAL & ACCESS PREFERENCES
    // ==========================================

    language: {
      type: String,
      default: "en",
    },

    serviceType: {
      type: String,
      enum: [
        "Urban",
        "Rural",
        "Urban Service",
        "Rural Service",
      ],
      default: "Urban Service",
    },

    bloodGroup: {
      type: String,
      default: "Not Specified",
    },

    // ==========================================
    // EMERGENCY CONTACT
    // ==========================================

    emergencyContact: {
      name: {
        type: String,
        default: "",
      },

      relation: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      note: {
        type: String,
        default: "",
      },
    },

    // ==========================================
    // CONSENTS
    // ==========================================

    consents: {
      treatmentConsent: {
        type: Boolean,
        default: false,
      },

      teleconsultConsent: {
        type: Boolean,
        default: false,
      },

      careFollowupConsent: {
        type: Boolean,
        default: false,
      },
    },
  },

  {
    timestamps: true,
  }
);

// ==========================================
// GENERATE UNIQUE PATIENT ID
// ==========================================

const generatePatientId = async () => {
  const Patient = mongoose.model("Patient");

  let patientId;
  let exists = true;

  while (exists) {
    const number = Math.floor(
      100000 + Math.random() * 900000
    );

    patientId = `PAT-${number}`;

    exists = await Patient.exists({
      patientId,
    });
  }

  return patientId;
};

// ==========================================
// AUTO GENERATE PATIENT ID
// ==========================================

patientSchema.pre("validate", async function () {
  if (!this.patientId) {
    this.patientId = await generatePatientId();
  }
});

// ==========================================
// EXPORT
// ==========================================

module.exports = mongoose.model(
  "Patient",
  patientSchema
);