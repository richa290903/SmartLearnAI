import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {theme === "dark" ?  <FaSun />:<FaMoon />}
    </button>
  );
};

export default ThemeToggle;