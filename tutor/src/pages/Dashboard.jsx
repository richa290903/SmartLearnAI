import MainLayout from "../layout/MainLayout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";
import { FaUsers, FaEye, FaWallet, FaBook } from "react-icons/fa";

function Dashboard() {

  const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 800 },
    { month: "Mar", revenue: 1200 },
    { month: "Apr", revenue: 1500 },
    { month: "May", revenue: 2000 },
  ];

  const courseData = [
    { name: "Course A", students: 120 },
    { name: "Course B", students: 90 },
    { name: "Course C", students: 60 },
    { name: "Course D", students: 150 },
  ];

  const pieData = [
    { name: "Mobile", value: 60 },
    { name: "Desktop", value: 25 },
    { name: "Tablet", value: 15 },
  ];

  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa"];

  return (
    <MainLayout>

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Instructor Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard icon={<FaWallet />} label="Total Earnings" value="$12,450" />
        <StatCard icon={<FaUsers />} label="Total Students" value="2,340+" />
        <StatCard icon={<FaBook />} label="Total Courses" value="12" />
        <StatCard icon={<FaEye />} label="Total Views" value="89,300" />
      </div>

      {/* Charts */}
      <div className="mt-12 grid xl:grid-cols-3 gap-10">

        {/* Revenue */}
        <ChartContainer title="Revenue Growth">
          <LineChart width={350} height={220} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ChartContainer>

        {/* Course Performance */}
        <ChartContainer title="Course Performance">
          <BarChart width={350} height={220} data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3b82f6" />
          </BarChart>
        </ChartContainer>

        {/* Student Devices */}
        <ChartContainer title="Student Devices">
          <PieChart width={290} height={230}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

      </div>

    </MainLayout>
  );
}

/* Stat Card */
function StatCard({ icon, label, value }) {
  return (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border shadow-md hover:shadow-blue-200 transition">
      <div className="text-blue-600 text-3xl mb-3">{icon}</div>
      <p className="text-slate-500">{label}</p>
      <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
    </div>
  );
}

/* Chart Container */
function ChartContainer({ title, children }) {
  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl border rounded-2xl shadow-md hover:shadow-blue-300 transition">
      <h2 className="text-lg font-semibold text-slate-700 mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default Dashboard;