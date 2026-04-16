// import { useState } from "react";
// import SideBar from "../components/SideBar";
// import { useTheme } from "../context/ThemeContext";
// import { FiMenu, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// function Student() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { theme } = useTheme();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const students = [
//     { name: "Kateryna Piven", group: "Web Design – 2.0", hw: "15/24", att: "8/8", proj: "5/6", grade: "95/100" },
//     { name: "Pavio Petrenko", group: "UI/UX – 37", hw: "12/24", att: "7/8", proj: "5/6", grade: "75/100" },
//   ];

//   return (
//     <div className={`flex min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-gradient-to-br from-green-900 to-green-400 text-gray-900"}`}>

//       {/* Sidebar */}
//       <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main */}
//       <div className={`flex-1 p-6 md:ml-64 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-white text-gray-900"} md:rounded-l-3xl`}>

//         {/* Top Bar */}
//         <div className="flex items-center justify-between mb-6">
//           {/* MENU BUTTON Mobile */}
//           <button className={`md:hidden ${theme === "dark" ? "text-white" : "text-gray-900"}`} onClick={toggleSidebar}>
//             <FiMenu size={28} />
//           </button>

//           <h1 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Friday 28 March 2025</h1>

//           <div className="flex items-center gap-3">
//             <img
//               src="https://i.pravatar.cc/40"
//               className="w-10 h-10 rounded-full"
//             />
//             <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Mentor Karina</span>
//             <FiChevronDown className={theme === "dark" ? "text-white" : "text-gray-900"} />
//           </div>
//         </div>

//         {/* Search + Date */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
//           {/* Date selector */}
//           <div className="flex items-center gap-2">
//             <button className={`p-2 rounded border transition ${theme === "dark" ? "border-gray-700 text-white bg-gray-900" : "border-gray-300 text-gray-700 bg-white"}`}><FiChevronLeft /></button>

//             <div className={`flex rounded overflow-hidden ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
//               {["M","T","W","T","F","S","S"].map((d,i)=>(
//                 <button
//                   key={i}
//                   className={`px-3 py-1 transition ${i===4 ? "bg-green-600 text-white" : theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
//                 >{d}</button>
//               ))}
//             </div>

//             <button className={`p-2 rounded border transition ${theme === "dark" ? "border-gray-700 text-white bg-gray-900" : "border-gray-300 text-gray-700 bg-white"}`}><FiChevronRight /></button>
//           </div>

//           {/* Search */}
//           <div className={`flex items-center px-3 py-2 rounded-md w-full md:w-auto ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
//             <FiSearch className={theme === "dark" ? "text-gray-300" : "text-gray-500"} />
//             <input
//               placeholder="Search"
//               className={`ml-2 bg-transparent outline-none w-full ${theme === "dark" ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-500"}`}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto mt-3">
//           <table className="w-full">
//             <thead className={`text-xs ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
//               <tr>
//                 <Th label="Name" theme={theme} />
//                 <Th label="Group" theme={theme} />
//                 <Th label="Homework" theme={theme} />
//                 <Th label="Attendance" theme={theme} />
//                 <Th label="Projects" theme={theme} />
//                 <Th label="Grade" theme={theme} />
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((s, i) => (
//                 <tr key={i} className={`border-b text-sm transition-colors duration-300 ${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-50"}`}>
//                   <Td theme={theme}>{s.name}</Td>
//                   <Td theme={theme}>{s.group}</Td>
//                   <Td theme={theme}>{s.hw}</Td>
//                   <Td theme={theme}>{s.att}</Td>
//                   <Td theme={theme}>{s.proj}</Td>
//                   <Td theme={theme} className="font-semibold">{s.grade}</Td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// function Th({ label, theme }) {
//   return (
//     <th className={`py-3 px-4 text-left uppercase font-bold tracking-wide ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{label}</th>
//   );
// }

// function Td({ children, theme, className = "" }) {
//   return <td className={`py-3 px-4 ${theme === "dark" ? "text-gray-200" : "text-gray-800"} ${className}`}>{children}</td>;
// }

// export default Student;


// import { useState } from "react";
// import SideBar from "../components/SideBar";
// import { useTheme } from "../context/ThemeContext";
// import { FiMenu, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// function Student() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { theme } = useTheme();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const students = [
//     { name: "Kateryna Piven", group: "Web Design – 2.0", hw: "15/24", att: "8/8", proj: "5/6", grade: "95/100" },
//     { name: "Pavio Petrenko", group: "UI/UX – 37", hw: "12/24", att: "7/8", proj: "5/6", grade: "75/100" },
//   ];

//   return (
//     <div
//       className={`flex min-h-screen transition-colors duration-300 ${
//         theme === "dark"
//           ? "bg-slate-900 text-slate-100"
//           : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       {/* Sidebar */}
//       <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main */}
//       <div
//         className={`flex-1 p-7 md:ml-64 transition-all duration-300 ${
//           theme === "dark"
//             ? "bg-slate-900 text-slate-100"
//             : "bg-white text-gray-900"
//         } rounded-l-3xl shadow-lg`}
//       >
//         {/* Top Bar */}
//         <div className="flex items-center justify-between mb-8">
//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden ${
//               theme === "dark" ? "text-white" : "text-gray-900"
//             }`}
//             onClick={toggleSidebar}
//           >
//             <FiMenu size={28} />
//           </button>

//           <h1
//             className={`text-xl font-semibold ${
//               theme === "dark" ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Friday 28 March 2025
//           </h1>

//           <div className="flex items-center gap-3">
//             <img
//               src="https://i.pravatar.cc/40"
//               className="w-10 h-10 rounded-full"
//             />
//             <span
//               className={`font-semibold ${
//                 theme === "dark" ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Mentor Karina
//             </span>
//             <FiChevronDown
//               className={theme === "dark" ? "text-white" : "text-gray-900"}
//             />
//           </div>
//         </div>

//         {/* Search + Date */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           {/* Date selector */}
//           <div className="flex items-center gap-2">
//             <button
//               className={`p-2 rounded-lg border shadow-sm transition ${
//                 theme === "dark"
//                   ? "border-gray-700 bg-gray-800 text-white"
//                   : "border-gray-300 bg-white text-gray-700"
//               }`}
//             >
//               <FiChevronLeft />
//             </button>

//             <div
//               className={`flex rounded-xl overflow-hidden shadow-sm ${
//                 theme === "dark" ? "bg-gray-800" : "bg-gray-200"
//               }`}
//             >
//               {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
//                 <button
//                   key={i}
//                   className={`px-3 py-2 text-sm transition font-semibold ${
//                     i === 4
//                       ? "bg-green-600 text-white"
//                       : theme === "dark"
//                       ? "text-gray-300 hover:text-white"
//                       : "text-gray-700 hover:text-black"
//                   }`}
//                 >
//                   {d}
//                 </button>
//               ))}
//             </div>

//             <button
//               className={`p-2 rounded-lg border shadow-sm transition ${
//                 theme === "dark"
//                   ? "border-gray-700 bg-gray-800 text-white"
//                   : "border-gray-300 bg-white text-gray-700"
//               }`}
//             >
//               <FiChevronRight />
//             </button>
//           </div>

//           {/* Search */}
//           <div
//             className={`flex items-center px-3 py-2 rounded-lg w-full md:w-auto shadow-sm ${
//               theme === "dark" ? "bg-gray-800" : "bg-gray-100"
//             }`}
//           >
//             <FiSearch
//               className={theme === "dark" ? "text-gray-300" : "text-gray-500"}
//             />
//             <input
//               placeholder="Search students..."
//               className={`ml-2 bg-transparent outline-none w-full ${
//                 theme === "dark"
//                   ? "text-white placeholder-gray-400"
//                   : "text-gray-900 placeholder-gray-500"
//               }`}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto mt-5">
//           <table className="w-full border-separate border-spacing-y-2">
//             <thead>
//               <tr>
//                 <Th label="Name" theme={theme} />
//                 <Th label="Group" theme={theme} />
//                 <Th label="Homework" theme={theme} />
//                 <Th label="Attendance" theme={theme} />
//                 <Th label="Projects" theme={theme} />
//                 <Th label="Grade" theme={theme} />
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((s, i) => (
//                 <tr
//                   key={i}
//                   className={`rounded-lg transition ${
//                     theme === "dark"
//                       ? "bg-gray-800 hover:bg-gray-700"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <Td theme={theme}>{s.name}</Td>
//                   <Td theme={theme}>{s.group}</Td>
//                   <Td theme={theme}>{s.hw}</Td>
//                   <Td theme={theme}>{s.att}</Td>
//                   <Td theme={theme}>{s.proj}</Td>
//                   <Td theme={theme} className="font-bold">
//                     {s.grade}
//                   </Td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Th({ label, theme }) {
//   return (
//     <th
//       className={`py-3 px-4 text-left uppercase text-xs font-bold tracking-wide ${
//         theme === "dark" ? "text-gray-400" : "text-gray-600"
//       }`}
//     >
//       {label}
//     </th>
//   );
// }

// function Td({ children, theme, className = "" }) {
//   return (
//     <td
//       className={`py-3 px-4 text-sm ${
//         theme === "dark" ? "text-gray-200" : "text-gray-800"
//       } ${className}`}
//     >
//       {children}
//     </td>
//   );
// }

// export default Student;



import { useState } from "react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";
import {
  FiMenu,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Student() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const students = [
    {
      name: "Kateryna Piven",
      group: "Web Design – 2.0",
      hw: "15/24",
      att: "8/8",
      proj: "5/6",
      grade: "95/100",
    },
    {
      name: "Pavio Petrenko",
      group: "UI/UX – 37",
      hw: "12/24",
      att: "7/8",
      proj: "5/6",
      grade: "75/100",
    },
  ];

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black text-white bg-slate-950 text-slate-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 p-5 md:ml-0 transition-all duration-300 flex justify-center`}
      >
        {/* CENTER BOX */}
        <div
          className={`w-full max-w-5xl rounded-3xl p-7 shadow-xl transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-950 text-slate-100 border border-neutral-800 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              className={`md:hidden ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              onClick={toggleSidebar}
            >
              <FiMenu size={28} />
            </button>

            <h1 className="text-xl font-semibold">Friday 28 March 2025</h1>

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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Date Selector */}
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg border ${
                  theme === "dark"
                    ? "border-neutral-700 bg-neutral-800"
                    : "border-gray-300 bg-white"
                }`}
              >
                <FiChevronLeft />
              </button>
{/* 
              <div
                className={`flex rounded-xl overflow-hidden ${
                  theme === "dark" ? "bg-neutral-800" : "bg-gray-200"
                }`}
              >
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <button
                    key={i}
                    className={`px-3 py-2 text-sm font-semibold ${
                      i === 4
                        ? "bg-green-600 text-white"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div> */}

              <button
                className={`p-2 rounded-lg border ${
                  theme === "dark"
                    ? "border-neutral-700 bg-neutral-800"
                    : "border-gray-300 bg-white"
                }`}
              >
                <FiChevronRight />
              </button>
            </div>

            {/* Search */}
            <div
              className={`flex items-center px-3 py-2 rounded-lg w-full md:w-auto ${
                theme === "dark"
                  ? "bg-neutral-800 border border-neutral-700"
                  : "bg-gray-100"
              }`}
            >
              <FiSearch
                className={
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }
              />
              <input
                placeholder="Search students..."
                className={`ml-2 bg-transparent outline-none w-full ${
                  theme === "dark"
                    ? "text-white placeholder-gray-400"
                    : "text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto mt-5">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <Th label="Name" theme={theme} />
                  <Th label="Group" theme={theme} />
                  <Th label="Homework" theme={theme} />
                  <Th label="Attendance" theme={theme} />
                  <Th label="Projects" theme={theme} />
                  <Th label="Grade" theme={theme} />
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={i}
                    className={`rounded-xl transition-all ${
                      theme === "dark"
                        ? "bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <Td theme={theme}>{s.name}</Td>
                    <Td theme={theme}>{s.group}</Td>
                    <Td theme={theme}>{s.hw}</Td>
                    <Td theme={theme}>{s.att}</Td>
                    <Td theme={theme}>{s.proj}</Td>
                    <Td theme={theme} className="font-bold">
                      {s.grade}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ label, theme }) {
  return (
    <th
      className={`py-3 px-4 text-left uppercase text-xs font-bold tracking-wide ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {label}
    </th>
  );
}

function Td({ children, theme, className = "" }) {
  return (
    <td
      className={`py-3 px-4 text-sm ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      } ${className}`}
    >
      {children}
    </td>
  );
}

export default Student;