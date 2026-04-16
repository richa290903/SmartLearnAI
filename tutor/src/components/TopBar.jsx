import { Moon } from "lucide-react";

const TopBar = () => {
  return (
    <div className="w-full bg-slate-800 rounded-xl px-6 py-4 flex items-center justify-between shadow-md">

      {/* Search */}
      <input
        type="text"
        placeholder="Search or type command..."
        className="bg-slate-900 text-gray-300 px-4 py-2 rounded-lg w-80 outline-none"
      />

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-yellow-400 text-xl">🌙</span>

        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full border"
        />
      </div>

    </div>
  );
};

export default TopBar;
