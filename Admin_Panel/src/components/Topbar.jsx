function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
      <input
        type="text"
        placeholder="Search or type command..."
        className="border px-4 py-2 rounded-lg w-80"
      />

      <div className="flex items-center gap-4">
        <span className="text-gray-500">🌙</span>
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
          alt="profile"
        />
      </div>
    </div>
  );
}
export default Topbar;
