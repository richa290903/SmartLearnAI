import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeValidator = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        console.log("Theme changed to:", theme);
        console.log("HTML classes:", document.documentElement.className);
        console.log("LocalStorage:", localStorage.getItem("theme"));
    }, [theme]);

    const testTheme = () => {
        const htmlClasses = document.documentElement.className;
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        const bodyColor = getComputedStyle(document.body).color;

        console.log("=== THEME TEST RESULTS ===");
        console.log("Current theme state:", theme);
        console.log("HTML classes:", htmlClasses);
        console.log("Body background:", bodyBg);
        console.log("Body text color:", bodyColor);
        console.log("LocalStorage theme:", localStorage.getItem("theme"));
        console.log("System prefers dark:", window.matchMedia("(prefers-color-scheme: dark)").matches);

        // Check if theme is properly applied
        const isDarkApplied = htmlClasses.includes("dark");
        const expectedDark = theme === "dark";

        if (isDarkApplied === expectedDark) {
            console.log("✅ Theme application: CORRECT");
        } else {
            console.log("❌ Theme application: INCORRECT");
        }

        alert(`Theme: ${theme}\nHTML Classes: ${htmlClasses}\nBody BG: ${bodyBg}\nBody Color: ${bodyColor}`);
    };

    return (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
            <h3 className="font-bold mb-2">Theme Validator</h3>
            <p className="text-sm mb-2">Current: <span className="font-bold">{theme}</span></p>
            <div className="flex gap-2">
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 bg-white text-blue-500 rounded text-sm"
                >
                    Toggle
                </button>
                <button
                    onClick={testTheme}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                    Test
                </button>
            </div>
        </div>
    );
};

export default ThemeValidator;