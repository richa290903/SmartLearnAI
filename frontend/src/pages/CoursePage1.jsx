import Sidebar1 from "../components/sidebar1";

function CoursesPage1() {
  const courses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Andrew",
      category: "AI & ML",
      duration: "8 Weeks",
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Full Stack React Development",
      instructor: "John Smith",
      category: "Web Development",
      duration: "6 Weeks",
      progress: 40,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      instructor: "Prof. Kumar",
      category: "Programming",
      duration: "10 Weeks",
      progress: 100,
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar1 />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-white">
            My Learning Courses
          </h1>
          <p className="text-gray-500 mt-2">
            Track your progress and continue your personalized AI recommended learning journey.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition duration-300"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {course.title}
              </h2>

              {/* Instructor */}
              <p className="text-sm text-gray-500">
                Instructor: {course.instructor}
              </p>

              {/* Category & Duration */}
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{course.category}</span>
                <span>{course.duration}</span>
              </div>

              {/* Progress Section */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-indigo-600">
                    {course.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      course.status === "Completed"
                        ? "bg-green-500"
                        : "bg-indigo-500"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex justify-between items-center">

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    course.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {course.status}
                </span>

                {course.status !== "Completed" && (
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-600 transition">
                    Continue
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default CoursesPage1;
