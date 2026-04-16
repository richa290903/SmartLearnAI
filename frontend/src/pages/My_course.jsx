import React, { useEffect, useState } from "react";

 function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(`http://127.0.0.1:8000/user/my-courses/${userId}`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🎓 My Courses
      </h1>

      {/* Course Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden 
                         hover:shadow-xl transform hover:-translate-y-1 
                         transition duration-300"
            >
              {/* Image */}
              <img
                src={`http://127.0.0.1:8000/${course.thumbnail}`}
                alt={course.name}
                className="h-40 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {course.name}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {course.category}
                </p>

                {/* Button */}
                <button
                  className="mt-4 w-full bg-[#2563eb] text-white py-2 rounded-lg 
                             hover:bg-[#1d4ed8] transition"
                >
                  ▶ Start Learning
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No courses purchased yet.</p>
        )}
      </div>
    </div>
  );
} export default MyCourses;