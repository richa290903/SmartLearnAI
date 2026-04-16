import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import Api from "../services/Api";  
import { FiPlus, FiUpload, FiVideo, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ModuleUpload from "./ModuleUpload";

const menuItems = ["Instructors", "Learners", "Employees"];
function Course() {
  const [active, setActive] = useState(0);
  const [coursedata, setCourseData] = useState([]);
  const { theme } = useTheme();

  // const fetchdata = async () => {
  //   const response = await Api.get("/course_display");
  //   setCourseData(response.data);
  // };

  const fetchdata = async () => {
  const response = await Api.get("/course_display");
  console.log("Fetched courses:", response.data);
  
  console.log("Count:", response.data.length);
  setCourseData(response.data);
  console.log(response.data);
};
  
  useEffect(() => {
    fetchdata();
  }, []);
 
  
  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-white text-gray-900"}`}>
      <SideBar />

      <div className="ml-20 md:ml-24 p-10 w-full">
        <h1 className={`text-4xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
          My Uploaded Courses
        </h1>

        <h1 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}>All Courses</h1>

        {/* Tabs */}
        <div className={`flex border-b mb-6 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition ${
                active === index
                  ? `border-b-2 border-purple-600 ${theme === "dark" ? "text-purple-400" : "text-purple-700"}`
                  : `${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coursedata.length > 0 ? (
            coursedata.map((data, index) => (
              <Link
                to={`/coursedetail/${data.course_id}`}
                key={data.course_id}
                className={`block shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
              >
                <div className="hover:scale-105 transition-transform duration-300">
                <div className="relative w-full overflow-hidden rounded-t-xl">
                  <img
                    src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
                    alt={data.course_title}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className={`font-semibold text-sm leading-tight ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {data.course_title}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-bold text-yellow-600 text-sm">
                       {data.category || "4.7"}
                    </span>
                  </div>

                  <div className={`flex gap-2 mt-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <p>For: {data.skill_level}</p>
                  </div>
                  <div
  className={`flex justify-between items-center mt-2 text-xs ${
    theme === "dark" ? "text-gray-400" : "text-gray-600"
  }`}
>
  <p>Prerequisites: {data.prerequisites}</p>
   
<Link
  to={`/module/${data.course_id}`}
  className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold
      shadow-md transition hover:scale-105 active:scale-95 hover:shadow-lg
      border border-purple-500/40 bg-gradient-to-r from-purple-600 to-purple-500 text-white"
>
  <FiPlus className="text-sm" />
  Add Module
</Link>

</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;