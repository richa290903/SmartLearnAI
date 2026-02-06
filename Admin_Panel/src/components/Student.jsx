import Sidebar from "../components/Sidebar";
import { useState,useEffect } from "react";
import Api from "../Api";


const data = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  product: `Product ${i + 1}`,
  price: `$${(i + 1) * 10}`,
  status: i % 2 === 0 ? "Active" : "Pending",
}));

function Student() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // const lastIndex = currentPage * rowsPerPage;
  // const firstIndex = lastIndex - rowsPerPage;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const [studdata,setstuddata] = useState([])
  const fetchdata = async () =>{
    const response = await Api.get("/student_display");
    setstuddata(response.data);
  }

  useEffect(()=>{
    fetchdata();
  },[])

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Students</h1>

        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Password</th>
              </tr>
            </thead>

            <tbody>
              { studdata.map((data) => (
                <tr key={data.stud_id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{data.stud_id}</td>
                  <td className="p-3">{data.fullname}</td>
                  <td className="p-3">{data.email}</td>
                  <td className="p-3">{data.password}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        data.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-1 border rounded disabled:opacity-50"
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
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-1 border rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Student;