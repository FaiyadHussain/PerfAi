import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../Images/logo.png";

const AddTask = () => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axios.get("http://localhost:3000/api/property");
      setProperties(res.data);
    };
    fetchProperties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/task", {
        description,
        dueDate,
        taskType,
        property: propertyId,
        status: "Pending",
      });
      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/task-list");
      }, 3000);
      setDescription("");
      setDueDate("");
      setTaskType("");
      setPropertyId("");
    } catch (err) {
      console.error(err);
      toast.error("Error adding task", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className=" mt-8 flex items-center justify-center gap-36 p-24">
      <div>
        <img src={Logo} alt="logo" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="border p-2 w-full"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            placeholder="Task Type (e.g., Collect Rent, Maintenance)"
            className="border p-2 w-full"
          />
          <select
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option key={property._id} value={property._id}>
                {property.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-900 text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
