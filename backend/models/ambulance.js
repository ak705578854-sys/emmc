const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  number: String,
  type: String,
  driverName: String,
  licenseNo: String,
  crew: Number,
  status: { type: String, default: "Active" },
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Ambulance", ambulanceSchema);