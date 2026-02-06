function StatCard({ title, value, percent, up }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      <span
        className={`text-sm font-medium ${
          up ? "text-green-500" : "text-red-500"
        }`}
      >
        {up ? "▲" : "▼"} {percent}
      </span>
    </div>
  );
}
export default StatCard;