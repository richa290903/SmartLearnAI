
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 380 },
  { month: "Mar", sales: 180 },
  { month: "Apr", sales: 290 },
  { month: "May", sales: 160 },
  { month: "Jun", sales: 170 },
  { month: "Jul", sales: 280 },
  { month: "Aug", sales: 90 },
  { month: "Sep", sales: 190 },
  { month: "Oct", sales: 380 },
  { month: "Nov", sales: 270 },
  { month: "Dec", sales: 100 },
];

function SalesChart() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">
        Monthly Sales
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />

          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#E5E7EB"
            }}
          />

          <Bar
            dataKey="sales"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;