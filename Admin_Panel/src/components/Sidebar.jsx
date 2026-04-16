import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaEnvelope,
  FaBookOpen,
  FaBlog,
  FaUserGraduate,
  FaCity,
  FaMapMarkedAlt,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";


function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data (if stored)
    localStorage.removeItem("token"); // optional
    sessionStorage.clear(); // optional

    // Redirect to login page
    navigate("/");
  };


  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
    ${
      isActive
        ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
        : "text-gray-400 hover:bg-gray-700 hover:text-white hover:translate-x-1"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 fixed flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500 tracking-wide">
          SmartLearn.AI
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          AI Learning Dashboard
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-2 px-4 mt-6 flex-1 overflow-y-auto">

        <NavLink to="/dashboard" className={menuClass}>
          <FaHome className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink to="/users" className={menuClass}>
          <FaUsers className="text-lg" />
          Users
        </NavLink>

        <NavLink to="/student" className={menuClass}>
          <FaUserGraduate className="text-lg" />
          Students
        </NavLink>

        <NavLink to="/instructors" className={menuClass}>
          <FaChalkboardTeacher className="text-lg" />
          Instructors
        </NavLink>

        <NavLink to="/courses" className={menuClass}>
          <FaBookOpen className="text-lg" />
          Courses
        </NavLink>

        <NavLink to="/blogs" className={menuClass}>
          <FaBlog className="text-lg" />
          Blogs
        </NavLink>

        <NavLink to="/contacts" className={menuClass}>
          <FaEnvelope className="text-lg" />
          Contacts
        </NavLink>

        <NavLink to="/cities" className={menuClass}>
          <FaCity className="text-lg" />
          Cities
        </NavLink>

        <NavLink to="/states" className={menuClass}>
          <FaMapMarkedAlt className="text-lg" />
          States
        </NavLink>


        <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                    text-gray-400 hover:bg-red-600 hover:text-white
                    transition-all duration-300"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>

      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 SmartLearn.AI
      </div>

    </div>
  );
}

export default Sidebar;