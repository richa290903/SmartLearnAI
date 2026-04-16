import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

 const handleDelete = async (course_id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      try {
        await Api.delete(`/courses/${course_id}`);
        setSelectedCourse(selectedCourse.filter((course) => course.course_id !== course_id));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting state:", error);
        alert("Failed to delete state.");
      }
    }
  };

  const handleView = (data) => {
    setSelectedCourse(data);
    setShowModal(true);
  };

  const fetchdata = async () => {
    const response = await Api.get("/course_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Pagination
  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentCourses = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-white">Courses</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">

          {/* TABLE SCROLL */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[1400px]">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Skill Level</th>
                  <th className="p-3">Prerequisites</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Tag</th>
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Video</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentCourses.map((data) => (
                  <tr
                    key={data.course_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-blue-400 font-semibold">
                      {data.course_id}
                    </td>

                    <td className="p-3">{data.course_title}</td>

                    <td className="p-3">{data.category}</td>

                    <td className="p-3">{data.skill_level}</td>

                    <td className="p-3">{data.prerequisites}</td>

                    <td className="p-3 max-w-[200px]">
                      {data.description.length > 50
                        ? data.description.substring(0, 50) + "..."
                        : data.description}
                    </td>

                    <td className="p-3">{data.tag}</td>

                    {/* THUMBNAIL */}
                    <td className="p-3">
                      <img
                        src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
                        alt="thumbnail"
                        className="w-40 h-24 object-cover rounded-lg shadow"
                      />
                    </td>

                    {/* VIDEO */}
                    <td className="p-3">
                      <video
                        src={`http://localhost:8000/Coursevideo/${data.video}`}
                        className="w-40 h-24 object-cover rounded-lg"
                        controls
                      />
                    </td>

                    <td className="p-3 text-green-400 font-semibold">
                      ₹{data.course_price}
                    </td>

                    <td className="p-3">{data.course_date}</td>

                    <td className="p-3">{data.course_time}</td>

                    <td className="p-3 flex gap-3 justify-center">
                    {/* VIEW */}
                    <button className="text-blue-400 hover:text-blue-300" onClick={() => handleView(data)}><FaEye /></button>
                  
                    {/* EDIT */}
                    <button className="text-yellow-400 hover:text-yellow-300" onClick={() => handleEdit(data)}><FaEdit /></button>
                  
                    {/* DELETE */}
                    <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(data.course_id)}><FaTrash /> </button>
                  
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

    {showModal && selectedCourse && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 w-[95%] md:w-[1000px] lg:w-[1200px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-700 relative"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-gray-400 hover:text-white text-xl z-10"
            >
              ✖
            </button>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-2 gap-0">

              {/* LEFT SIDE (IMAGE + VIDEO) */}
              <div className="bg-black rounded-l-2xl overflow-hidden">

                {/* THUMBNAIL */}
                <img
                  src={`http://localhost:8000/Thumbnail/${selectedCourse.thumbnail}`}
                  alt="thumbnail"
                  className="w-full h-64 object-cover"
                />

                {/* VIDEO */}
                <div className="p-4">
                  <video
                    src={`http://localhost:8000/Coursevideo/${selectedCourse.video}`}
                    controls
                    className="w-full rounded-lg border border-gray-700"
                  />
                </div>
              </div>

              {/* RIGHT SIDE (DETAILS) */}
              <div className="p-6 space-y-5">

                {/* TITLE */}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCourse.course_title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedCourse.category} • {selectedCourse.skill_level}
                  </p>
                </div>

                {/* PRICE + TAG */}
                <div className="flex justify-between items-center">
                  <span className="text-green-400 text-2xl font-semibold">
                    ₹{selectedCourse.course_price}
                  </span>
                  <span className="bg-blue-900 text-blue-400 px-3 py-1 rounded-full text-xs">
                    {selectedCourse.tag}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Description</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* PREREQUISITES */}
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Prerequisites</h3>
                  <p className="text-gray-200 text-sm">
                    {selectedCourse.prerequisites || "None"}
                  </p>
                </div>

                {/* INFO CARDS */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">Date</p>
                    <p className="text-white">{selectedCourse.course_date}</p>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">Time</p>
                    <p className="text-white">{selectedCourse.course_time}</p>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="text-right">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Courses;