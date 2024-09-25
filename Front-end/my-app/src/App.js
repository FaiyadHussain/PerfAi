import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import AddProperty from "./Components/AddProperty";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import Navbar from "./Components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="text-green-900">
      <ToastContainer />

      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
