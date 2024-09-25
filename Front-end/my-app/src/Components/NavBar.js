import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white text-green-900 p-4 shadow-lg sticky top-0 z-50">
      {" "}
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center  cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="h-10 w-10 mr-4" />
          <h1 className="text-xl font-bold  text-green-900">
            WAQF PROPERTY MANAGEMENT
          </h1>
        </div>

        <div className="flex space-x-8">
          <Link
            to="/"
            className="hover:text-gray-600 text-lg font-semibold transition-colors"
          >
            HOME
          </Link>
          <Link
            to="/add-property"
            className="hover:text-gray-600 text-lg font-semibold transition-colors"
          >
            ADD PROPERTY
          </Link>
          <Link
            to="/add-task"
            className="hover:text-gray-600 text-lg font-semibold transition-colors"
          >
            ADD TASK
          </Link>
          <Link
            to="/task-list"
            className="hover:text-gray-600 text-lg font-semibold transition-colors"
          >
            TASK LIST
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
