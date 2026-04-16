import Sidebar1 from "../components/sidebar1";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analyticssession1() {
  // ================= SAMPLE DATA =================

  const monthlyProgress = [
    { month: "Jan", hours: 12 },
    { month: "Feb", hours: 18 },
    { month: "Mar", hours: 22 },
    { month: "Apr", hours: 30 },
    { month: "May", hours: 26 },
    { month: "Jun", hours: 35 },
  ];

  const courseDistribution = [
    { name: "Completed", value: 7 },
    { name: "Ongoing", value: 5 },
    { name: "Not Started", value: 3 },
  ];

  const skillData = [
    { skill: "Programming", level: 85 },
    { skill: "DevOps", level: 70 },
    { skill: "Business", level: 60 },
    { skill: "AI/ML", level: 75 },
  ];

  const COLORS = ["#6366f1", "#a855f7", "#f59e0b"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar1 />

      <div className="flex-1 flex justify-center">
        <motion.div
          className="w-full max-w-7xl p-10 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* ================= HEADER ================= */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-700">
              Learning Analytics Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Analyze your performance, engagement, and skill growth insights.
            </p>
          </div>

          {/* ================= KPI CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {[
              {
                title: "Performance Score",
                value: "92%",
                icon: <Award size={24} />,
                color: "text-purple-600 bg-purple-100",
              },
              {
                title: "Completion Rate",
                value: "78%",
                icon: <Target size={24} />,
                color: "text-green-600 bg-green-100",
              },
              {
                title: "Avg Study Time",
                value: "3.2h/day",
                icon: <Clock size={24} />,
                color: "text-blue-600 bg-blue-100",
              },
              {
                title: "Learning Streak",
                value: "14 Days",
                icon: <Activity size={24} />,
                color: "text-indigo-600 bg-indigo-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
              >
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>
                  <h2 className="text-2xl font-bold text-gray-700 mt-2">
                    {item.value}
                  </h2>
                </div>
                <div className={`p-3 rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* ================= CHARTS ROW 1 ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            
            {/* Monthly Study Hours */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">
                Monthly Study Hours
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgress}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Course Distribution */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">
                Course Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= SKILL ANALYTICS ================= */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              Skill Growth Analytics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillData}>
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="level" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Analyticssession1;
