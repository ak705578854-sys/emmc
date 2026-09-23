const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL;

    if (!mongoURI) {
      throw new Error("DATABASE_URL is not configured");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(
      `[EMMC DB] MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      `[EMMC DB Error]: ${error.message}`
    );

    process.exit(1);
  }
};

module.exports = connectDB;
