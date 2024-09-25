const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getOverdueTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

// Define routes
router.post("/", createTask); // Create a new task
router.get("/", getTasks); // Get all tasks
router.get("/overdue", getOverdueTasks); // Get overdue tasks
router.patch("/:id/status", updateTaskStatus); // Update task status

module.exports = router;
