import { useEffect, useState } from "react";
import Api from "../services/Api";
import Sidebar1 from "../components/Sidebar1";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function CoursePage1() {
  const [recentCourses, setRecentCourses] = useState([]);
  const [interestCourses, setInterestCourses] = useState([]);
  const [loading, setLoading] = useState(true);

   const [rating, setRating] = useState(0);

  const handleRating = async (value) => {
    setRating(value);

    try {
      await fetch(`http://localhost:8000/rate_course/${course_id}?rating=${value}`, {
        method: "POST",
        credentials: "include"
      });

      alert("Rating submitted!");
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Fetch Recent Courses
  const fetchRecent = async () => {
    try {
      const res = await Api.get("/recent_courses");
      console.log("RECENT:", res.data);
      setRecentCourses(res.data);
    } catch (err) {
      console.log("RECENT ERROR:", err.response);
    }
  };

  // ✅ Fetch Interest Data
  const fetchInterest = async () => {
    try {
      const res = await Api.get("/course_view_percentage");
      console.log("INTEREST:", res.data);
      setInterestCourses(res.data);
    } catch (err) {
      console.log("INTEREST ERROR:", err.response);
    }
  };

  // ✅ Load Data on Page Load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchRecent();
      await fetchInterest();

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar1 />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-indigo-50 to-purple-50">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          📊 My Learning Dashboard
        </h1>

        {/* ================= RECENT COURSES ================= */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🕒 Recently Viewed Courses
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {recentCourses.length === 0 ? (
               
              <p className="text-gray-500">No recent courses</p>
            ) : (

              recentCourses.map((c) => (
              <Link
                to={`/coursedisplay/${c.course_id}`}
                key={c.course_id}
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
                  
                  <img
                    src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
                    className="h-40 w-full object-cover"
                    alt={c.title}
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {c.title}
                    </h3>
                  </div>

                </div>
              </Link>
            ))
            )}

          </div>
        )}

       
        {/* ================= INTEREST COURSES ================= */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🤖 Your Learning Interests
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {interestCourses.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (

              // interestCourses.map((c) => (
              // <Link
              //   to={`/coursedisplay/${c.course_id}`}
              //   key={c.course_id}
              // >
              //   <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">

              //     <img
              //       src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
              //       className="w-full h-40 object-cover"
              //       alt={c.title}
              //     />

              //     <div className="p-5">

              //       <h3 className="text-lg font-semibold text-gray-700 mb-1">
              //         {c.title}
              //       </h3>

              //       <p className="text-xs text-gray-400 mb-3">
              //         {c.category}
              //       </p>

              //       <div className="flex justify-between text-sm mb-2">
              //         <span className="text-gray-500">Interest Level</span>
              //         <span className="font-bold text-indigo-600">
              //           {c.percentage}%
              //         </span>
              //       </div>

              //       <div className="w-full bg-gray-200 h-3 rounded-full">
              //         <div
              //           className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
              //           style={{ width: `${c.percentage}%` }}
              //         />
              //       </div>

              //     </div>

              //   </div>
              // </Link>

              interestCourses.map((c) => (
  <Link
    to={`/coursedisplay/${c.course_id}`}
    key={c.course_id}
  >
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-[1.03] cursor-pointer flex flex-col">

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
          className="w-full h-40 object-cover"
          alt={c.title}
        />

        {/* Completed Badge */}
        {c.percentage >= 90 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Completed
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {c.title}
        </h3>

        {/* Category */}
        <p className="text-xs text-gray-400 mb-3">
          {c.category}
        </p>

        {/* Progress Text */}
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-indigo-600">
            {Math.round(c.percentage)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${c.percentage}%` }}
          />
        </div>

        {/* Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition"
        >
          Continue Learning
        </button>

      </div>
    </div>
  </Link>
))
            

            )}

          </div>
        )}

      </div>

        <div className="flex gap-2 mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => handleRating(star)}
          className={`cursor-pointer text-2xl ${
            rating >= star ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>




    </div>
  );
}

export default CoursePage1;