import React from "react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";

function QnaPage() {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"}`}>
      {/* FIXED SIDEBAR */}
      <SideBar />
      <div className={`flex-1 ml-16 overflow-y-auto p-10 transition-all duration-300 ${theme === "dark" ? "bg-slate-950" : "bg-gray-50"}`}>
        <div className={`max-w-5xl mx-auto rounded-xl p-10 shadow-2xl transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Q&A</h1>
            <div className="flex items-center gap-4">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Student</span>
              <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-semibold">
                NY
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-10 flex flex-col items-center text-center">
            <div className={`w-40 h-40 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
              <div className="text-6xl">🤖</div>
            </div>
            <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>No questions yet</h2>
            <p className={theme === "dark" ? "text-gray-300 max-w-lg" : "text-gray-600 max-w-lg"}>
              Q&A is a forum where your students can ask questions, hear your responses,
              and respond to one another. Here's where you'll see your courses' Q&A threads.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-16 border-t pt-6">
            <div className="flex flex-wrap items-center gap-6 text-gray-700">
              <label className={`flex items-center gap-2 cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <input type="checkbox" /> Unread (0)
              </label>
              <label className={`flex items-center gap-2 cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <input type="checkbox" /> No top answer (0)
              </label>
              <label className={`flex items-center gap-2 cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <input type="checkbox" /> No answers (0)
              </label>
              <label className={`flex items-center gap-2 cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <input type="checkbox" /> No instructor answer (0)
              </label>

              <div className="ml-auto flex items-center gap-2">
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Sort by:</span>
                <select className={`border rounded-lg px-3 py-1 ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}>
                  <option>Newest first</option>
                  <option>Oldest first</option>
                </select>
              </div>

              <div className="flex items-center gap-3 ml-4">
                <button className="w-10 h-10 bg-purple-600 text-white rounded-lg font-bold">▦</button>
                <button className="w-10 h-10 bg-purple-100 text-purple-700 rounded-lg font-bold">☰</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default QnaPage;
