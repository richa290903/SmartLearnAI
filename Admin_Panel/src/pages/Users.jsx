import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../Api";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (data) => {
    setSelectedUser(data);
    setShowModal(true);
  };

  const fetchdata = async () => {
    const response = await Api.get("/users_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentUsers = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Users</h1>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
                <th className="p-3">User ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                {/* <th className="p-3">Password</th> */}
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((data) => (
                <tr
                  key={data.user_id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium text-blue-400">
                    {data.user_id}
                  </td>

                  <td className="p-3">{data.fullname}</td>

                  <td className="p-3 text-gray-400">{data.email}</td>
{/* 
                  <td className="p-3 text-red-400">••••••••</td> */}
                  {/* <td className="p-3 text-red-400">{data.password}</td> */}

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.status === "Active"
                          ? "bg-green-900 text-green-400"
                          : "bg-yellow-900 text-yellow-400"
                      }`}
                    >
                      {data.status || "Active"}
                    </span>
                  </td>

                  <td className="p-3 flex gap-3 justify-center">
                    {/* VIEW */}
                    <button className="text-blue-400 hover:text-blue-300" onClick={() => handleView(data)}><FaEye /></button>
                  
                    {/* EDIT */}
                    <button className="text-yellow-400 hover:text-yellow-300" onClick={() => handleEdit(data)}><FaEdit /></button>
                  
                    {/* DELETE */}
                    <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(data.stud_id)}><FaTrash /> </button>
                  
                 </td>
                  
                </tr>
              ))}
              
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>

        </div>
      </div>


    {showModal && selectedUser && (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setShowModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 w-[500px] rounded-2xl shadow-2xl border border-gray-700 p-6 relative"
        >

          {/* CLOSE */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
          >
            ✖
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
              {selectedUser.fullname?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                {selectedUser.fullname}
              </h2>
              <p className="text-gray-400 text-sm">
                User ID: {selectedUser.user_id}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
              <p className="text-gray-400">Email</p>
              <p className="text-white font-semibold">
                {selectedUser.email}
              </p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">Status</p>
              <p
                className={`font-semibold ${
                  selectedUser.status === "Active"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {selectedUser.status || "Active"}
              </p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">Role</p>
              <p className="text-white font-semibold">
                {selectedUser.role || "User"}
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <div className="mt-6 text-right">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    )}


    </div>
  );
}

export default Users;