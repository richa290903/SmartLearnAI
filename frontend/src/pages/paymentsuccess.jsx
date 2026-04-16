import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, BookOpen } from "lucide-react";

 function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;
  const paymentId = location.state?.payment_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#1a1a2e] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#1a1a2e] shadow-2xl rounded-3xl p-8 max-w-xl w-full text-center"
      >
        {/* SUCCESS ICON */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center"
        >
          <CheckCircle size={80} className="text-green-500" />
        </motion.div>

        {/* HEADING */}
        <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Payment Successful! 🎉
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
          Thank you for your purchase. Your course is now unlocked!
        </p>

        {/* PAYMENT INFO */}
        {paymentId && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Payment ID:</strong> {paymentId.substring(0, 15)}...
            </p>
          </motion.div>
        )}

        {/* COURSE DETAILS */}
        {course && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail_url}
                alt={course.course_title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
                <p className="font-semibold text-gray-900 dark:text-white">{course.course_title}</p>
                <p className="text-green-600 font-bold">₹{course.course_price}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* FEATURES */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-left"
        >
          <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
            ✅ What you get:
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>✓ Full lifetime access to the course</li>
            <li>✓ Certificate of completion</li>
            <li>✓ All course materials included</li>
            <li>✓ 24/7 support available</li>
          </ul>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-courses")}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <BookOpen size={20} />
            Start Learning Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/invoice?payment_id=${paymentId}`)}
            className="w-full border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Invoice
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          A confirmation email has been sent to your registered email address
          <br />
          <span className="text-yellow-600 dark:text-yellow-400 font-semibold">🧪 Test Mode Transaction</span>
        </p>
      </motion.div>
    </div>
  );
}export default PaymentSuccess;