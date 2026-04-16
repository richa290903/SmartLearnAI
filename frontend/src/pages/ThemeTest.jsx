import React from "react";
import { useTheme } from "../context/ThemeContext";
import DarkMode from "../components/DarkMode/DarkMode";

const ThemeTest = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen p-8 bg-white dark:bg-black text-black dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    🎨 Theme Test Page
                </h1>

                <div className="mb-8 text-center">
                    <p className="text-xl mb-4">
                        Current Theme: <span className="font-bold text-blue-600 dark:text-blue-400">{theme.toUpperCase()}</span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <DarkMode />
                        <button
                            onClick={toggleTheme}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                        >
                            Toggle Theme (Button)
                        </button>
                    </div>
                </div>

                {/* Test different elements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1 */}
                    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Card with Background
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This card should have a white background in light mode and dark gray in dark mode.
                        </p>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                            Test Button
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Another Card
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            This card has a different background color that should also change.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                Blue Badge
                            </span>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                                Green Badge
                            </span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 bg-white dark:bg-black border-2 border-gray-400 dark:border-gray-500 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                            High Contrast Card
                        </h2>
                        <p className="text-gray-800 dark:text-gray-200 mb-4">
                            This card should be completely white/black with high contrast text.
                        </p>
                        <input
                            type="text"
                            placeholder="Test input field"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Gradient Background
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This card has a gradient background that changes with the theme.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-400 dark:bg-gray-500 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>

                {/* Status Section */}
                <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Theme Status
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Current Theme:</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                {theme}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">HTML Classes:</span>
                            <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                                {document.documentElement.className || "none"}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">LocalStorage:</span>
                            <span className="ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">
                                {localStorage.getItem("theme") || "not set"}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">System Prefers:</span>
                            <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded">
                                {window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeTest;