import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import {
  FiUser,
  FiPhone,
  FiBookOpen,
} from "react-icons/fi";

function SidebarProfile() {
  return (
    <div>
    <div className="shadow-lg flex-1 border rounded-xl  border-none shadow-xl  shadow-lg shadow-indigo-500/50 border-none bg-gray-50 display-static">
      {/* Header */}
      {/* <ProfileTop /> */}
      {/* Body */}
      <div className="max-w-7xl mx-auto mt-6 flex gap-6 p-4">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white rounded-xl p-5 shadow-sm">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        {/* Logo / Avatar */}
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>

        {/* Basic Details */}
        <div>
          <h2 className="text-lg font-semibold">Nisha Yadav</h2>
          <p className="text-sm text-gray-500">Student</p>
        </div>
      </div>

          {/* Menu */}
          <nav className="space-y-3 mt-4">
            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
              <FiUser className="text-gray-600" />
              <span className="text-gray-700">Basic Details</span>
            </Link>

            <Link to="/Contactdetail" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
              <FiPhone className="text-gray-600" />
              <span className="text-gray-700">Contact Details</span>
            </Link>

            <Link to="/professionaldetail" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
              <FiBookOpen className="text-gray-600" />
              <span className="text-gray-700">Professional Details</span>
            </Link>

            <Link to="/acadmic" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
              <HiAcademicCap className="text-gray-600" />
              <span className="text-gray-700">Academics Information</span>
            </Link>
          </nav>
        </aside>


        {/* Right Content */}
        </div>
    </div>
    </div>
  );
}
export default SidebarProfile;
