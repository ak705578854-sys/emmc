const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User.js");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb://127.0.0.1:27017/emmc_db";

const staffUsers = [
  {
    userId: "AMB123456",
    name: "EMMC Ambulance Team",
    email: "ambulance@emmc.com",
    password: "AMB@123456",
    role: "ambulance",
  },
  {
    userId: "DOC123456",
    name: "EMMC Doctor",
    email: "doctor@emmc.com",
    password: "DOC@123456",
    role: "doctor",
  },
  {
    userId: "HOS123456",
    name: "EMMC Hospital",
    email: "hospital@emmc.com",
    password: "HOS@123456",
    role: "hospital",
  },
  {
    userId: "POL123456",
    name: "EMMC Police",
    email: "police@emmc.com",
    password: "POL@123456",
    role: "police",
  },
];

async function createStaffUsers() {
  try {
    await mongoose.connect(DATABASE_URL);

    console.log(
      "[EMMC DB] MongoDB Connected"
    );

    for (const staff of staffUsers) {
      const existingUser = await User.findOne({
        $or: [
          { userId: staff.userId },
          { email: staff.email },
        ],
      });

      if (existingUser) {
        console.log(
          `Already exists: ${staff.userId}`
        );
        continue;
      }

      const hashedPassword =
        await bcrypt.hash(
          staff.password,
          10
        );

      await User.create({
        userId: staff.userId,
        name: staff.name,
        email: staff.email,
        password: hashedPassword,
        role: staff.role,
      });

      console.log(
        `Created: ${staff.userId}`
      );
    }

    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      "STAFF LOGIN ACCOUNTS"
    );
    console.log(
      "======================================"
    );
    console.log(
      "AMB -> AMB123456 / AMB@123456"
    );
    console.log(
      "DOC -> DOC123456 / DOC@123456"
    );
    console.log(
      "HSP -> HOS123456 / HOS@123456"
    );
    console.log(
      "POL -> POL123456 / POL@123456"
    );
    console.log(
      "======================================"
    );

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error(
      "[EMMC STAFF ERROR]",
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
}

createStaffUsers();