import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import Api from "../services/Api";

const menuItems = ["Instructors", "Learners", "Employees"];

function Course() {
  const [active, setActive] = useState(0);
  const [coursedata, setCourseData] = useState([]);

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
    <div className="flex fullscreen w-[100%] h-[100%] bg-gradient-to-br from-white to-slate-100">
      <SideBar />

      <div className="ml-20 md:ml-24 p-10 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          My Uploaded Courses
        </h1>

        <h1 className="text-3xl font-bold mb-4">All Courses</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition ${
                active === index
                  ? "border-b-2 border-purple-600 text-purple-700"
                  : "text-gray-600 hover:text-black"
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
                // key={index}
                key={data.course_id}
                className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
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
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                    {data.course_title}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-bold text-yellow-600 text-sm">
                       {data.category || "4.7"}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2 text-xs">
                    <p>For: {data.skill_level}</p>
                  </div>

                  <div className="flex gap-2 mt-2 text-xs">
                    <p>Prerequisites: {data.prerequisites}</p>
                  </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
