import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// Icons
import { MdDashboard, MdOndemandVideo, MdMessage } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import DarkMode from "./DarkMode/DarkMode";

function SideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <MdOndemandVideo />, label: "My Courses", path: "/" },
    { icon: <FaPlusCircle />, label: "Create Course", path: "/courseupload" },
    { icon: <FaUsers />, label: "Students", path: "/student" },
    { icon: <MdMessage />, label: "Messages", path: "/qnapage"},
    { icon: <IoSettingsSharp />, label: "Settings", path: "/settingpage" },
  ];

  return (
    <div
      className={`
        h-screen shadow-2xl 
        transition-all duration-300 ease-in-out 
        flex flex-col overflow-hidden fixed left-0 top-0 z-50
        ${open ? "w-64" : "w-16"}
        ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}
      `}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      {/* LOGO */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b transition-colors duration-300 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <div className="text-blue-500 font-extrabold text-3xl tracking-wide">
          S
        </div>

        <span className={`text-lg font-semibold transition-all duration-300 text-blue-500 ${open ? "opacity-100" : "opacity-0"}`}>
          SmartLearn.AI
        </span>
      </div>

      {/* MENU LIST */}
      <ul className="px-3 mt-6 space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className={`
              group relative flex items-center gap-4 p-3 rounded-lg cursor-pointer
              transition-all duration-200
              ${theme === "dark" ? "hover:bg-blue-600 hover:shadow-blue-500/40" : "hover:bg-gray-100 text-gray-700"}
              hover:shadow-md
            `}
          >
            <span className="text-xl">{item.icon}</span>

            {open && (
              <span className="whitespace-nowrap text-sm font-medium tracking-wide">
                {item.label}
              </span>
            )}

            {!open && (
              <span
                className={`
                  absolute left-14 px-2 py-1 rounded text-xs
                  opacity-0 group-hover:opacity-100 transition-all shadow-lg
                  ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}
                `}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
      {/* THEME TOGGLE */}
      <div className={`
        group relative flex items-center gap-4 p-3 rounded-lg mx-3 mb-4
        ${open ? "cursor-default" : "cursor-pointer"}
        transition-all duration-200
        ${theme === "dark" ? "hover:bg-blue-600 hover:shadow-blue-500/40" : "hover:bg-gray-100 hover:shadow-md"}
        ${open ? "justify-between" : "justify-center"}
      `}>
        {/* Icon - Clickable when collapsed */}
        <span 
          className={`text-xl transition-all duration-200 ${!open ? "cursor-pointer" : ""}`}
          onClick={!open ? toggleTheme : undefined}
        >
          {theme === "dark" ? <FiMoon /> : <BsSun />}
        </span>

        {/* Full UI when sidebar is open */}
        {open && (
          <>
            <span className="whitespace-nowrap text-sm font-medium tracking-wide">
              Theme
            </span>
            <DarkMode />
          </>
        )}
        {/* Tooltip when sidebar is collapsed */}
        {!open && (
          <span
            className={`
              absolute left-14 px-2 py-1 rounded text-xs
              opacity-0 group-hover:opacity-100 transition-all shadow-lg whitespace-nowrap
              ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}
            `}
          >
            Toggle Theme
          </span>
        )}
      </div>
      {/* LOGOUT */}
      <div className="mt-auto px-3 mb-4">
        <div
          className={`
            flex items-center gap-4 p-3 rounded-lg 
            cursor-pointer transition-all
            ${theme === "dark" ? "hover:bg-red-600 hover:shadow-red-500/40" : "hover:bg-red-100 text-gray-700"}
            hover:shadow-md
          `}
          onClick={() => navigate("/logout")}
        >
          <RiLogoutCircleLine className="text-xl" />
          {open && <span className="text-sm font-medium">Logout</span>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
