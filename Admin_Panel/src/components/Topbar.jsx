function Topbar() {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-700">

      {/* Search */}
      <input
        type="text"
        placeholder="Search or type command..."
        className="bg-gray-900 text-gray-200 placeholder-gray-400 border border-gray-700 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Dark Mode Icon */}
        <span className="text-gray-400 text-xl cursor-pointer hover:text-white transition">
          🌙
        </span>

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full border-2 border-gray-600 hover:border-blue-500 transition"
          alt="profile"
        />
      </div>

    </div>
  );
}

export default Topbar;