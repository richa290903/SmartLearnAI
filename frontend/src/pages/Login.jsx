import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Api from "../services/Api";


function Login() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
          const res = await Api.post("/login", formData);
          alert(res.data.message);
          navigate("/");
        } catch (err) {
          alert(err.response.data.detail);
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
        {/* Overlay */}
        <motion.div
          onClick={() => navigate("/")}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white w-[380px] rounded-lg shadow-xl p-6 z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >

         {/* Welcome Heading */}
          <div className="relative mb-4">
            <button onClick={() => navigate("/")} className="absolute right-0 top-0 text-gray-500 text-xl hover:text-black" >✕</button>

            {/* Center Content */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-sm text-gray-500">
                Please login to your account
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Login</h2>
            
          </div>
          {/* Username */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-3 hover:bg-blue-700">
            Login
          </button>
          </form>
          <h4>{email}</h4>
          <h4>{password}</h4>
          {/* Register */}
          <p className="text-sm text-center"> 
              Don’t have an account?
              <Link to="/registration" className="text-blue-600 ml-1 hover:underline">Register here</Link>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
}

export default Login;
