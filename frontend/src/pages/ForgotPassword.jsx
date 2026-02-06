import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {Link} from 'react-router';

function ForgotPassword() {
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    // Move to next input
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
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
          className="relative bg-white w-[450px] rounded-xl shadow-2xl p-6 z-10"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Link to="/login" className="absolute left-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black transition -mt-2">
            <span className="text-4xl">‹</span>
          </Link>

          {/* Header */}
          <div className="relative mb-6">
            <button
              onClick={() => navigate("/")}
              className="absolute right-0 top-0 text-gray-400 text-xl hover:text-black transition"
            >
              ✕
            </button>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Forgot Password
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Enter your Email Address and we’ll send an OTP
              </p>
            </div>
          </div>

          {/* Email + Send OTP */}
          <div className="mb-5">
            <label className="block text-sm mb-1 font-medium">
              Email Address
            </label>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="example@email.com"
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition">
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP */}
          <div className="mb-5">
            <label className="block text-sm mb-2 font-medium">
              Enter 4-digit OTP
            </label>

            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="w-1/2 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
              Resend OTP
            </button>

            <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Verify OTP
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotPassword;
