import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { MdDashboard, MdOndemandVideo, MdMessage } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

function SideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/Dashboard" },
    { icon: <MdOndemandVideo />, label: "My Courses", path: "/" },
    { icon: <FaPlusCircle />, label: "Create Course", path: "/CourseUpload" },
    { icon: <FaUsers />, label: "Students", path: "" },
    { icon: <MdMessage />, label: "Messages", path: "/QnaPage"},
    { icon: <IoSettingsSharp />, label: "Settings", path: "/SettingPage" },
  ];

  return (
    <div
      className={`
        h-screen bg-slate-900 text-white shadow-2xl 
        transition-all duration-300 ease-in-out 
        flex flex-col overflow-hidden fixed left-0 top-0 z-50
        ${open ? "w-64" : "w-16"}
      `}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      {/* LOGO */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
        <div className="text-blue-500 font-extrabold text-3xl tracking-wide">
          S
        </div>

        <span className={`text-lg font-semibold transition-all duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
          SmartLearn.AI
        </span>
      </div>

      {/* MENU LIST */}
      <ul className="px-3 mt-6 space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className="
              group relative flex items-center gap-4 p-3 rounded-lg cursor-pointer
              hover:bg-blue-600 hover:shadow-blue-500/40 hover:shadow-md
              transition-all duration-200
            "
          >
            <span className="text-xl">{item.icon}</span>

            {open && (
              <span className="whitespace-nowrap text-sm font-medium tracking-wide">
                {item.label}
              </span>
            )}

            {!open && (
              <span
                className="
                  absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-xs
                  opacity-0 group-hover:opacity-100 transition-all shadow-lg
                "
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* LOGOUT */}
      <div className="mt-auto px-3 mb-4">
        <div
          className="
            flex items-center gap-4 p-3 rounded-lg 
            hover:bg-red-600 cursor-pointer 
            hover:shadow-red-500/40 hover:shadow-md transition-all
          "
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
