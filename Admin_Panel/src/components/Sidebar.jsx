import { FaHome, FaChartBar, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed">
      <h1 className="text-2xl font-bold p-6 text-blue-600">SmartLearn.AI</h1>

      <ul className="space-y-2 px-4">
        <Link to="/">
          <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 text-blue-600 cursor-pointer">
            <FaHome /> Dashboard
          </li>
        </Link>

        <Link to="/student">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaUsers /> Students
          </li>
        </Link>
        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
          <FaChartBar /> Analytics
        </li>
        <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
          <FaUsers /> Customers
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
