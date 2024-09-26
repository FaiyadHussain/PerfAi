const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["Mosque", "School", "Land"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
