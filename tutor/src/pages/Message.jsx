const menuItems = [
  "Instructors",
  "Learners",
  "Employees",
];
function Message()
{
    return(
        <div className="flex">
                 <div className="flex border-b">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`px-6 py-3 text-sm font-medium transition
                          ${
                            active === index
                              ? "border-b-2 border-purple-600 text-purple-700"
                              : "text-gray-600 hover:text-black"
                          }`}>
                        {item}
                      </button>))}
                  </div>
            {/* FIXED SIDEBAR (expands on hover, does NOT push content) */}
            <SideBar />
        </div>
    )
}export default Message;