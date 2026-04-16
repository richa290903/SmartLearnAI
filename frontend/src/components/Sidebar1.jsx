import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/Api";
import { Home, User, BarChart2, BookOpen, Camera } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar1() {

  const [userId, setUserId] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [student, setStudent] = useState(null);

  const fileInputRef = useRef(null);

  // ================= GET LOGGED USER =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    Api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("Logged User:", res.data);
        setUserId(res.data.user_id);
        setAuthUser(res.data);
        console.log(res.data)

      })
      .catch((err) => console.log(err));
  }, []);

  // ================= FETCH STUDENT =================
    useEffect(() => {
      if (userId) {
        fetchStudent(userId);
      }
    }, [userId]);

    const fetchStudent = async () => {
  try {
    const res = await Api.get("/get_student_by_user", {
      withCredentials: true
    });

    console.log("Student:", res.data);

    if (res.data.exists) {
      setStudent(res.data);
    } else {
      setStudent(null);
    }

  } catch (err) {
    console.log("Fetch Error:", err);
    setStudent(null);
  }
};


  // ================= IMAGE UPLOAD =================
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await Api.post(`/profile_photo/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      alert("Photo Uploaded Successfully");

      fetchStudent(userId);

    } catch (err) {
      console.log("Upload Error:", err);
    }
  };


  return (

    <div className="w-64 bg-slate-600 text-white p-6 sticky top-0 h-screen flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
         <img
            src={
              student?.photo
                ? `http://localhost:8000/StudentPhotos/${student.photo}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
          />
          {/* ===== Camera Button ===== */}
          <button
            onClick={handleCameraClick}
            className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-700 transition group-hover:scale-110"
          >
            <Camera size={16} />
          </button>

          {/* ===== Hidden File Input ===== */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* ✅ CHANGE 5: safe rendering */}
        <h2 className="mt-4 text-lg font-semibold">
          {authUser?.fullname || "User"}
        </h2>
        <p className="text-sm text-indigo-200">
          AI Learner
        </p>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="space-y-6 flex-1">
        <Link
          to={`/exampleprofile`}
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <Home size={20} />
          Dashboard
        </Link>
        <Link
          to={`/profilesection`}
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          to={`/analyticspage`}
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <BarChart2 size={20} />
          Analytics
        </Link>

        <Link
          to={`/coursepage`}
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <BookOpen size={20} />
          Courses
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar1;
