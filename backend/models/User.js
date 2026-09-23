const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER ID
    // ==========================================

    userId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      uppercase: true,
    },

    // ==========================================
    // BASIC INFORMATION
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    // ==========================================
    // PASSWORD
    // ==========================================

    password: {
      type: String,
      required: true,
    },

    // ==========================================
    // ROLE
    // ==========================================

    role: {
      type: String,

      enum: [
        "hospital",
        "patient",
        "police",
        "ambulance",
        "doctor",
        "lho",
      ],

      required: true,

      lowercase: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);