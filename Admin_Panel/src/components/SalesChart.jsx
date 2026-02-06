import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366F1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default SalesChart;
