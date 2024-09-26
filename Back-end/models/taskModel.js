const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  type: {
    type: String,
    enum: ["Collect rent", "Maintenance", "Other"],
  },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
});

module.exports = mongoose.model("Task", taskSchema);
