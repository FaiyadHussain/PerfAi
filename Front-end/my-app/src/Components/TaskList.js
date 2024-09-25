import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Logo from "../Images/logo.png";

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

    const today = new Date();
    const formattedDate = format(today, "dd-MM-yyyy");
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

  const todayDate = new Date();

  const filteredTasks = tasks.filter((task) => {
    return filterStatus === "All" || task.status === filterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <img src={Logo} alt="logo" className="w-28" />
      </div>
      <p className="mb-4">
        <strong>Current Date:</strong> {currentDate}
      </p>

      <div className="mb-4 flex flex-wrap space-x-4 font-bold">
        {["All", "Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 bg-transparent border-b-2 rounded-none ${
              filterStatus === status
                ? "border-b-green-900 text-grey-900"
                : "text-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => {
          const isOverdue = new Date(task.dueDate) < todayDate;
          const formattedDueDate = format(new Date(task.dueDate), "dd-MM-yyyy");

          return (
            <div
              key={task._id}
              className={`border border-green-900 p-4 rounded-lg shadow-md shadow-green-200`}
            >
              <div className="flex justify-end">
                <div
                  className={`p-1 rounded-md text-center text-[10px] text-white ${
                    isOverdue
                      ? "bg-red-600"
                      : task.status === "Pending"
                      ? "bg-yellow-600"
                      : task.status === "Completed"
                      ? "bg-green-600"
                      : "bg-yellow-200"
                  }`}
                >
                  {task.status === "In Progress" ? "Progress" : task.status}
                </div>
              </div>
              <p className="text-sm">
                <span className="font-bold">Description:</span>{" "}
                {task.description}
              </p>
              <p className="text-sm">
                <span className="font-bold">Due Date:</span> {formattedDueDate}
              </p>
              <p className="text-sm">
                <span className="font-bold">Status:</span>
                <span
                  className={
                    task.status === "Pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {task.status}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-bold">Property:</span>
                <span className="font-bold">{task.property.name}</span>
              </p>
              <div className="mt-4 flex flex-col md:flex-row">
                <button
                  onClick={() => markAsInProgress(task._id)}
                  className="bg-white text-green-900 border border-green-900 py-1 px-2 rounded mr-2 mb-2 md:mb-0"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => markAsCompleted(task._id)}
                  className="bg-green-900 text-white py-1 px-2 rounded"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
