import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Mosque"); // Default value set to 'Mosque'

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/property", {
        name,
        location,
        type,
      });
      toast.success("Property added successfully!", navigate("/add-task"), {
        position: "top-right",
        autoClose: 3000,
      });
      setName("");
      setLocation("");
      setType("Mosque"); // Reset the type to default value
    } catch (err) {
      console.error(err);
      toast.error("Error adding property", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mt-8  flex flex-col md:flex-row items-center justify-center gap-36 p-6 md:p-20">
      <img src={Logo} alt="logo" className="w-32 md:w-48 mb-6 md:mb-0" />

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Property Name"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="border p-2 w-full rounded"
          />

          {/* Dropdown for Property Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="Mosque">Mosque</option>
            <option value="School">School</option>
            <option value="Land">Land</option>
          </select>

          <button
            type="submit"
            className="bg-green-900 text-white py-2 px-4 rounded w-full"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
