import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <Topbar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <StatCard title="Customers" value="3,782" percent="11.01%" up />
          <StatCard title="Orders" value="5,359" percent="9.05%" />
          <StatCard title="Revenue" value="$20K" percent="10%" up />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SalesChart />

          <div className="bg-white p-6 rounded-xl shadow flex items-center justify-center">
            <h2 className="text-3xl font-bold text-indigo-600">75.55%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
