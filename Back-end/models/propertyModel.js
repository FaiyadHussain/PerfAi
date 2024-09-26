const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Mosque", "School", "land"], required: true },
});

module.exports = mongoose.model("Property", propertySchema);
