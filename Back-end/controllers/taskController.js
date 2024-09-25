const Task = require("../models/taskModel");

async function createTask(req, res) {
  try {
    const newTask = await new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTasks(req, res) {
  const { status, property } = req.query;
  const query = {};
  if (status) query.status = status;
  if (property) query.property = property;
  const tasks = await Task.find(query).populate("property");
  res.json(tasks);
}

async function getOverdueTasks(req, res) {
  const now = new Date();
  const overdueTasks = await Task.find({
    dueDate: { $lt: now },
    status: "Pending",
  }).populate("property");
  res.json(overdueTasks);
}

async function updateTaskStatus(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getOverdueTasks,
  updateTaskStatus,
};
