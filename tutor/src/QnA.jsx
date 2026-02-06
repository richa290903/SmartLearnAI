import React from "react";
import SideBar from "./SideBar";

function QnaPage() {
  return (
    <div className="flex h-screen">
      {/* FIXED SIDEBAR */}
      <SideBar />
      <div className="flex-1 ml-16 overflow-y-auto bg-gray-50 p-10 transition-all duration-300">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-10">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Q&A</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Student</span>
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                NY
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-10 flex flex-col items-center text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-6xl">🤖</div>
            </div>
            <h2 className="text-xl font-semibold mb-2">No questions yet</h2>
            <p className="text-gray-600 max-w-lg">
              Q&A is a forum where your students can ask questions, hear your responses,
              and respond to one another. Here's where you'll see your courses' Q&A threads.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-16 border-t pt-6">
            <div className="flex flex-wrap items-center gap-6 text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" /> Unread (0)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" /> No top answer (0)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" /> No answers (0)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" /> No instructor answer (0)
              </label>

              <div className="ml-auto flex items-center gap-2">
                <span>Sort by:</span>
                <select className="border rounded-lg px-3 py-1">
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
