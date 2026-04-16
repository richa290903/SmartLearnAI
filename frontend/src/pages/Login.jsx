import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Api from "../services/Api";
// import { hashPassword } from "../utils/hash";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    // LOGIN
    await Api.post("/login", formData);

    // GET USER FROM COOKIE
    const meRes = await Api.get("/me");
    const user_id = meRes.data.user_id;

    console.log("USER:", meRes.data);

    // ================= STUDENT =================
    if (role === "Student") {
      const studentRes = await Api.get("/get_student_by_user");

      if (studentRes.data.exists) {
        navigate("/home");
      } else {
        navigate("/exampleprofile");
      }
      return;
    }

    // ================= INSTRUCTOR =================
    else if (role === "Instructor") {
      const instructorRes = await Api.get(`/get_instructor_by_user/${user_id}`);

      if (instructorRes.data.exists) {
        window.location.href = "http://localhost:5174/dashboard";
      } else {
        window.location.href = `http://localhost:5174/ProfileSetup?user_id=${user_id}`;
      }
      return;
    }
    navigate("/home");
    window.location.reload();

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || "Login Failed");
  }
};


  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={() => navigate("/")}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          <motion.div
            className="relative bg-white w-[380px] rounded-lg shadow-xl p-6 z-10"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-sm text-gray-500">Please login to your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Login As</label>
                  <select
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                  <option value="--Select Role--" disabled></option>
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4 relative">
                  <label className="block text-sm mb-1">Password</label>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    className="absolute right-3 top-9 text-sm text-blue-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don’t have an account?
              <Link to="/registration" className="text-blue-600 ml-1 hover:underline">
                Register here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;