import { useState } from "react";
import { Search } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import DarkMode from "./DarkMode/DarkMode";

function Header() {
  const [open, setOpen] = useState(false);
  const [openc, setOpenc] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const { theme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm transition-all duration-300 border border-white ">
      <nav className="w-full flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl text-blue-700 dark:text-blue-700 font-bold transition-colors hover:text-blue-600 dark:hover:text-blue-600">
            SmartLearn.AI
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center rounded-full shadow border
          px-4 py-2 bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-700 transition-all">

          <Search className="text-blue-700 dark:text-blue-700" />

          <input
            placeholder="Search for anything"
            className="ml-2 w-full bg-transparent outline-none
              text-sm text-gray-800 dark:text-white placeholder-gray-400"
          />
        </div>

        {/* NAV LINKS */}
        <div className="hidden lg:flex gap-x-12 text-gray-800 dark:text-gray-200">
          <Link to="/" className="font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Home</Link><br/>
          {/* <Link to="/about" className="font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">About</Link> */}
          <Link to="/blog" className="font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Blog</Link><br/>
          <Link to="/allcourses" className="font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Courses</Link><br/>
          <Link to="/contact" className="font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Contact</Link>
        </div>

        {/*  THEME BUTTON */}
        <div className="hidden lg:flex items-center ml-4">
          <DarkMode />
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="text-black-700 dark:text-blue-700 transition-colors">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48
              bg-white dark:bg-gray-800
              rounded shadow-lg z-50
              border border-gray-200 dark:border-gray-700 transition-all">

              <ul className="text-gray-800 dark:text-gray-200">
                {isLoggedIn ? (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Link to="/exampleprofile">Profile</Link>
                    </li>

                    <li
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                      }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Link to="/login">Login</Link>
                    </li>

                    <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Link to="/registration">Registration</Link>
                    </li>
                  </>
                )}
              </ul>

            </div>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Header;