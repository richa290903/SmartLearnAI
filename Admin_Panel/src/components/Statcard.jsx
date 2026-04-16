function StatCard({ title, value, percent, up }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 w-full hover:bg-gray-700 transition">
      
      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2 text-white">{value}</h2>

      <span
        className={`text-sm font-medium flex items-center gap-1 mt-2 ${
          up ? "text-green-400" : "text-red-400"
        }`}
      >
        {up ? "▲" : "▼"} {percent}
      </span>

    </div>
  );
}

export default StatCard;