import Sidebar1 from "../components/sidebar1";
import Recommendationchart1 from "../components/recommandationchart1";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Timer,
  Calendar,
} from "lucide-react";

function ExampleProfile() {

  // Sample Data (Connect API later)
  const weeklyStudyHours = 18; // hours completed
  const weeklyGoal = 25;
  const progressPercent = (weeklyStudyHours / weeklyGoal) * 100;

  const userData = {
    recommendedCourses: [
      { title: "Advanced React Patterns", level: "Intermediate" },
      { title: "DevOps with AWS", level: "Advanced" },
      { title: "Business Strategy Masterclass", level: "Beginner" },
    ],
  };

  const stats = [
    {
      title: "Total Enrolled Courses",
      value: 12,
      icon: <BookOpen size={26} />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Completed Courses",
      value: 7,
      icon: <CheckCircle size={26} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Ongoing Courses",
      value: 5,
      icon: <Clock size={26} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "AI Performance Score",
      value: "92%",
      icon: <TrendingUp size={26} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Time Spent",
      value: "128 hrs",
      icon: <Timer size={26} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Last Accessed",
      value: "16 Feb 2026",
      icon: <Calendar size={26} />,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
  <div className="flex min-h-screen bg-gray-100">
    
    {/* Sidebar */}
    <Sidebar1 />

    {/* Main Content */}
    <div className="flex-1 flex justify-center">
      <motion.div
        className="w-full max-w-7xl p-8 lg:p-12 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-700">
            User Profile Dashboard
          </h1>
          <p className="text-gray-500 mt-3">
            Track your learning performance and AI-driven recommendations.
          </p>
        </div>

       {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-md p-7 flex items-center justify-between 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold text-gray-700 mt-2">
                {stat.value}
              </h2>
            </div>

            <div className={`p-4 rounded-2xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>


        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          
          {/* AI Chart */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
              AI Learning Insights
            </h2>
            <Recommendationchart1 />
          </div>

          {/* Weekly Study Ring */}
          <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-8">
              Weekly Study Hours
            </h2>

            <div className="relative w-44 h-44">
              <svg className="transform -rotate-90" width="180" height="180">
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  stroke="#e5e7eb"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  stroke="url(#gradient)"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray={471}
                  strokeDashoffset={
                    471 - (471 * progressPercent) / 100
                  }
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-700">
                  {weeklyStudyHours}h
                </span>
                <span className="text-sm text-gray-500">
                  / {weeklyGoal}h Goal
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 text-center max-w-xs">
              You’ve completed {Math.round(progressPercent)}% of your weekly learning goal.
            </p>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">
            AI Recommended Courses For You
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {userData.recommendedCourses.map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-7 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-lg font-semibold">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm opacity-90">
                  Level: {course.level}
                </p>
                <button className="mt-5 bg-white text-indigo-600 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  </div>
);
}

export default ExampleProfile;
