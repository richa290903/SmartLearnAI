import { useState } from "react";
import SideBar from "../components/SideBar";
import { FiMenu, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

 function Student() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const students = [
    { name: "Kateryna Piven", group: "Web Design – 2.0", hw: "15/24", att: "8/8", proj: "5/6", grade: "95/100" },
    { name: "Pavio Petrenko", group: "UI/UX – 37", hw: "12/24", att: "7/8", proj: "5/6", grade: "75/100" },
  ];

  return (
    <div className="flex bg-gradient-to-br from-green-900 to-green-400 min-h-screen">

      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="flex-1 p-6 md:ml-64 bg-white md:rounded-l-3xl">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          {/* MENU BUTTON Mobile */}
          <button className="md:hidden text-gray-900" onClick={toggleSidebar}>
            <FiMenu size={28} />
          </button>

          <h1 className="text-lg font-semibold">Friday 28 March 2025</h1>

          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Mentor Karina</span>
            <FiChevronDown />
          </div>
        </div>

        {/* Search + Date */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          {/* Date selector */}
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded"><FiChevronLeft /></button>

            <div className="flex bg-gray-200 rounded overflow-hidden">
              {["M","T","W","T","F","S","S"].map((d,i)=>(
                <button
                  key={i}
                  className={`px-3 py-1 ${i===4 ? "bg-green-600 text-white":"text-gray-700"}`}
                >{d}</button>
              ))}
            </div>

            <button className="p-2 border rounded"><FiChevronRight /></button>
          </div>

          {/* Search */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-full md:w-auto">
            <FiSearch className="text-gray-500" />
            <input
              placeholder="Search"
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-xs">
              <tr>
                <Th label="Name" />
                <Th label="Group" />
                <Th label="Homework" />
                <Th label="Attendance" />
                <Th label="Projects" />
                <Th label="Grade" />
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 text-sm">
                  <Td>{s.name}</Td>
                  <Td>{s.group}</Td>
                  <Td>{s.hw}</Td>
                  <Td>{s.att}</Td>
                  <Td>{s.proj}</Td>
                  <Td className="font-semibold">{s.grade}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

function Th({ label }) {
  return (
    <th className="py-3 px-4 text-left uppercase font-bold tracking-wide">{label}</th>
  );
}

function Td({ children }) {
  return <td className="py-3 px-4">{children}</td>;
}export default Student;