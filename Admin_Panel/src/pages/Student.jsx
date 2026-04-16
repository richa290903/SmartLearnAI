import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../Api";

function Student() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (stud_id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await Api.delete(`/students/${stud_id}`);
        setstuddata(studdata.filter((stud) => stud.stud_id !== stud_id));
        alert("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };


  const fetchdata = async () => {
    const response = await Api.get("/students_display");
    setstuddata(response.data);
  };

  const handleView = (data) => {
  setSelectedStudent(data);
  setShowModal(true);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Pagination
  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentStudents = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
       <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-white">Students</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">Student ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Education</th>
                  <th className="p-3">State ID</th>
                  <th className="p-3">City ID</th>
                  <th className="p-3">Skills</th>
                  <th className="p-3">Languages</th>
                  <th className="p-3">Photo</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map((data) => (
                  <tr
                    key={data.stud_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 font-semibold text-blue-400">
                      {data.stud_id}
                    </td>
                    <td className="p-3">{data.user_id}</td>
                    <td className="p-3">{data.age}</td>
                    <td className="p-3">{data.education}</td>
                    <td className="p-3">{data.state_id}</td>
                    <td className="p-3">{data.city_id}</td>
                    <td className="p-3">
                        {data.skills?.length > 20
                          ? data.skills.substring(0, 20) + "..."
                          : data.skills || "N/A"}
                      </td>
                    <td className="p-3">
                        {data.language?.length > 15
                          ? data.language.substring(0, 15) + "..."
                          : data.language || "N/A"}
                      </td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:8000/StudentPhotos/${data.photo}`}
                        alt="blog"
                        className="w-40 h-24 object-cover rounded-lg shadow"
                      />
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 flex gap-3 justify-center">
                      
                      {/* VIEW */}
                      <button
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => handleView(data)}
                      >
                        <FaEye />
                      </button>

                      {/* EDIT */}
                      <button
                        className="text-yellow-400 hover:text-yellow-300"
                        onClick={() => handleEdit(data)}
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(data.stud_id)}
                      >
                        <FaTrash />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
    </div>


  {showModal && selectedStudent && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

        {/* MODAL BOX */}
        <div className="bg-gray-900 w-[600px] rounded-2xl shadow-2xl border border-gray-700 p-6 relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ✖
          </button>

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`http://localhost:8000/StudentPhotos/${selectedStudent.photo}`}
              alt="student"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-white">
                Student #{selectedStudent.stud_id}
              </h2>
              <p className="text-gray-400 text-sm">
                User ID: {selectedStudent.user_id}
              </p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">Age</p>
              <p className="text-white font-semibold">{selectedStudent.age}</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">Education</p>
              <p className="text-white font-semibold">{selectedStudent.education}</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">State</p>
              <p className="text-white font-semibold">{selectedStudent.state_id}</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400">City</p>
              <p className="text-white font-semibold">{selectedStudent.city_id}</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
              <p className="text-gray-400">Skills</p>
              <p className="text-white font-semibold">
                {selectedStudent.skills}
              </p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
              <p className="text-gray-400">Languages</p>
              <p className="text-white font-semibold">
                {selectedStudent.language}
              </p>
            </div>

          </div>

          {/* FOOTER BUTTON */}
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

export default Student;