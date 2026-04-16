import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/Statcard"
import SalesChart from "../components/SalesChart";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const [users, setUsers] = useState(0);
  const [students, setStudents] = useState(0);
  const [instructor, setInstructor] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/total_users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.total_users);
      });

    axios.get("http://localhost:8000/total_student")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.total_student);
      });

    axios.get("http://localhost:8000/total_instructor")
      .then((res) => {
        console.log(res.data);
        setInstructor(res.data.total_instructor);
      });

  }, []);
  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        {/* <Topbar /> */}

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <StatCard title="Users" value={users} percent="11.01%" up />
          <StatCard title="Students" value={students} percent="9.05%" />
          <StatCard title="Instructors" value={instructor} percent="10%" up />
        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <SalesChart />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-blue-400">75.55%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
