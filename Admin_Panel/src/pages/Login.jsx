// INSERT INTO admin (admin_email, admin_password) VALUES ('admin123@gmail.com', 'admin@123');

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Api from "../Api";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await Api.post("/admin_login", {
      admin_email: email,          // ✅ correct key
      admin_password: password     // ✅ correct key
    });

    if (res.data.success) {
      navigate("/dashboard"); 
    } else {
      setError("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    setError("Login failed");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-[400px]
                   shadow-[0_0_25px_rgba(59,130,246,0.3)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm">
            Login to continue 🚀
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-900/40 border border-red-700 text-red-400 px-3 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-5 relative">
            <label className="block text-sm mb-1 text-gray-400">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       py-2 rounded-md font-semibold text-white shadow-md"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-right mt-5 text-gray-400">
          <Link
            to="/registration"
            className="text-blue-500 ml-1 hover:underline"
          >
           Forgot Password
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;