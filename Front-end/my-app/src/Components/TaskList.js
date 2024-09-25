import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns"; // Importing date-fns for formatting

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:3000/api/task");
      setTasks(res.data);
    };

    fetchTasks();

    // Set the current date on initial render (without time)
    const today = new Date();
    const formattedDate = format(today, "dd-MM-yyyy"); // Only the date is shown
    setCurrentDate(formattedDate);
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/task/${taskId}/status`,
        {
          status: newStatus,
        }
      );
      toast.success("Status updated successfully!");
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      toast.error("Error updating status");
    }
  };

  const markAsCompleted = (taskId) => {
    handleStatusChange(taskId, "Completed");
  };

  const markAsInProgress = (taskId) => {
    handleStatusChange(taskId, "In Progress");
  };

  // Get the current date for overdue checks
  const todayDate = new Date();

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    return filterStatus === "All" || task.status === filterStatus;
  });

  return (
    <div className="max-w-md mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      {/* Show current date */}
      <p className="mb-4">
        <strong>Current Date:</strong> {currentDate}
      </p>

      {/* Filter Options */}
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-1"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredTasks.map((task) => {
        // Check if the task is overdue
        const isOverdue = new Date(task.dueDate) < todayDate;

        // Format the due date without time using date-fns
        const formattedDueDate = format(
          new Date(task.dueDate),
          "dd-MM-yyyy" // Only the date is shown
        );

        return (
          <div
            key={task._id}
            className={`border p-4 mb-4 rounded-lg ${
              isOverdue
                ? "bg-red-400" // More pronounced red for overdue tasks
                : task.status === "Pending"
                ? "bg-red-200"
                : task.status === "Completed"
                ? "bg-green-200"
                : "bg-yellow-200"
            }`}
          >
            <p>Description: {task.description}</p>
            <p>Due Date: {formattedDueDate}</p>{" "}
            {/* Display formatted date without time */}
            <p>
              Status:{" "}
              <span
                className={
                  task.status === "Pending" ? "text-red-600" : "text-green-600"
                }
              >
                {task.status}
              </span>
            </p>
            <p>
              Property: <span className="font-bold">{task.property.name}</span>
            </p>
            <button
              onClick={() => markAsInProgress(task._id)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
            >
              Mark as In Progress
            </button>
            <button
              onClick={() => markAsCompleted(task._id)}
              className="bg-green-500 text-white py-1 px-2 rounded"
            >
              Mark as Completed
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
