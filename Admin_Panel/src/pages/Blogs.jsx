import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Api from "../Api";

function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [blogdata, setblogdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const rowsPerPage = 5;


  const filteredBlogs = blogdata.filter((item) =>
  item.blogername.toLowerCase().includes(search.toLowerCase()) ||
  item.blogtitle.toLowerCase().includes(search.toLowerCase()) ||
  item.blogdescription.toLowerCase().includes(search.toLowerCase())
);

  const handleDelete = async (blog_id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      try {
        await Api.delete(`/blogs/${blog_id}`);
        // Remove deleted state from UI without refetching
        setblogdata(blogdata.filter((blog) => blog.blog_id !== blog_id));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting state:", error);
        alert("Failed to delete state.");
      }
    }
  };


  const handleView = (data) => {
    setSelectedBlog(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const fetchdata = async () => {
    const response = await Api.get("/blog_display");
    setblogdata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);
  const currentBlogs = filteredBlogs.slice(firstIndex, lastIndex);

  // const currentBlogs = blogdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-white">Blogs</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

        <div className="flex justify-between items-center mb-5">

    <div className="flex items-center gap-4 mb-6">

      {/* Title */}
      {/* <h2 className="text-lg font-semibold text-gray-300 whitespace-nowrap">
        Student List
      </h2> */}

      {/* SEARCH BOX */}
      <div className="relative flex-1 group">

        {/* Glow effect */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-focus-within:opacity-100 blur-sm transition duration-300"></div>

        <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 shadow-md">
          
          {/* ICON */}
          <span className="text-gray-400 mr-3">🔍</span>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search by name, skills, education..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
          />
        </div>

      </div>

    </div>


      </div>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">

              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">Blog ID</th>
                  <th className="p-3">Blogger Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentBlogs.map((data) => (
                  <tr
                    key={data.blog_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-blue-400 font-semibold">
                      {data.blog_id}
                    </td>

                    <td className="p-3">{data.blogername}</td>

                    <td className="p-3">{data.blogerrole}</td>

                    {/* BLOG IMAGE */}
                    <td className="p-3">
                      <img
                        src={`http://localhost:8000/BlogImages/${data.blogimage}`}
                        alt="blog"
                        className="w-40 h-24 object-cover rounded-lg shadow"
                      />
                    </td>

                     <td className="p-3">
                        {data.blogtitle?.length > 15
                          ? data.blogtitle.substring(0, 15) + "..."
                          : data.blogtitle || "N/A"}
                      </td>

                    {/* DESCRIPTION */}
                    <td className="p-3 max-w-[250px]">
                      {data.blogdescription.length > 60
                        ? data.blogdescription.substring(0, 60) + "..."
                        : data.blogdescription}
                    </td>

                    <td className="p-3 text-gray-400">
                      {data.blogdate}
                    </td>


                    <td className="p-3 flex gap-3 justify-center">
                    {/* VIEW */}
                    <button className="text-blue-400 hover:text-blue-300" onClick={() => handleView(data)}><FaEye /></button>
                  
                    {/* EDIT */}
                    <button className="text-yellow-400 hover:text-yellow-300" onClick={() => handleEdit(data)}><FaEdit /></button>
                  
                    {/* DELETE */}
                    <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(data.blog_id)}><FaTrash /> </button>
                  
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



    {showModal && selectedBlog && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        
        <div className="bg-gray-900 text-white rounded-xl shadow-xl w-[700px] p-6 relative border border-gray-700">

          {/* CLOSE BUTTON */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ✖
          </button>

          {/* TITLE */}
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Blog Details
          </h2>

          {/* IMAGE */}
          <img
            src={`http://localhost:8000/BlogImages/${selectedBlog.blogimage}`}
            alt="blog"
            className="w-full h-60 object-cover rounded-lg mb-4"
          />

          {/* DETAILS */}
          <div className="space-y-2">
            <p><strong>ID:</strong> {selectedBlog.blog_id}</p>
            <p><strong>Blogger:</strong> {selectedBlog.blogername}</p>
            <p><strong>Role:</strong> {selectedBlog.blogerrole}</p>
            <p><strong>Title:</strong> {selectedBlog.blogtitle}</p>
            <p><strong>Date:</strong> {selectedBlog.blogdate}</p>
            <p><strong>Description:</strong></p>
            <p className="text-gray-300">{selectedBlog.blogdescription}</p>
          </div>

        </div>
      </div>
    )}


    </div>
  );
}

export default Blogs;