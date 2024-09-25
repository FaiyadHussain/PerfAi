import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import AddProperty from "./Components/AddProperty";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sticky Navbar */}
      <nav className="bg-gray-600 text-white p-4 shadow-lg sticky top-0 z-50">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-200 text-lg font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-property"
              className="hover:text-gray-200 text-lg font-semibold"
            >
              Add Property
            </Link>
          </li>
          <li>
            <Link
              to="/add-task"
              className="hover:text-gray-200 text-lg font-semibold"
            >
              Add Task
            </Link>
          </li>
          <li>
            <Link
              to="/task-list"
              className="hover:text-gray-200 text-lg font-semibold"
            >
              Task List
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
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
