import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

const DarkMode = () => {
    const { theme, toggleTheme } = useTheme();

    const handleToggle = () => {
        console.log("Toggle clicked, current theme:", theme);
        toggleTheme();
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md border border-gray-300 dark:border-gray-600"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? (
                <BsMoon className="text-xl text-blue-700" />
            ) : (
                <BsSun className="text-xl text-blue-700" />
            )}
        </button>
    );
};

export default DarkMode;