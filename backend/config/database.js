const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/emmc_db"
    );
    console.log(`[EMMC DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[EMMC DB Error]: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;