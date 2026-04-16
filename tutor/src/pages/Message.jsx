import { useState } from "react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  "Instructors",
  "Learners",
  "Employees",
];

function Message() {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-white text-gray-900"
    }`}>
      <SideBar />

      <div className="ml-20 md:ml-24 p-10 w-full">
        <h1 className={`text-4xl font-bold mb-8 transition-colors duration-300 ${
          theme === "dark" ? "text-slate-100" : "text-slate-800"
        }`}>
          Messages
        </h1>

        {/* Tabs */}
        <div className={`flex border-b mb-6 transition-colors duration-300 ${
          theme === "dark" ? "border-slate-700" : "border-gray-200"
        }`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                active === index
                  ? `border-b-2 border-purple-600 ${
                      theme === "dark" ? "text-purple-400" : "text-purple-700"
                    }`
                  : `${
                      theme === "dark"
                        ? "text-slate-400 hover:text-slate-100"
                        : "text-gray-600 hover:text-black"
                    }`
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Message Content */}
        <div className={`p-8 rounded-lg transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900" : "bg-gray-50"
        }`}>
          <p className={`text-center transition-colors duration-300 ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}>
            Messages feature coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;