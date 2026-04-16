  import React, { useState, useEffect } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { motion } from "framer-motion";
  import Api from "../services/Api";

  export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const course = location.state?.course;

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [billing, setBilling] = useState({
      name: "",
      email: "",
      phone: "",
    });

    // ✅ GET USER DATA FROM STORAGE
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
        setBilling({
          name: userData.fullname || "",
          email: userData.email || "",
          phone: userData.phone || ""
        });
      }
    }, []);

    // ✅ IF NO COURSE, REDIRECT
    if (!course) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
          <p className="text-red-500 text-lg">No course selected. Redirecting...</p>
        </div>
      );
    }

    // ✅ HANDLE RAZORPAY PAYMENT
    const handlePayment = async () => {
      setLoading(true);
      try {
        // 🔹 STEP 1: CREATE ORDER FROM BACKEND
        const orderRes = await Api.post("/payment/create-order", {
          user_id: user?.user_id || 1,
          course_id: course.course_id
        });

        const { order_id, amount, currency, key_id } = orderRes.data;

        // 🔹 STEP 2: OPEN RAZORPAY CHECKOUT
        const options = {
          key: key_id,
          amount: amount, // in paise
          currency: currency,
          name: "SmartLearnAI",
          description: `${course.course_title}`,
          order_id: order_id,
          // ✅ HANDLER AFTER SUCCESSFUL PAYMENT
          handler: async function (response) {
            try {
              // 🔹 STEP 3: VERIFY PAYMENT ON BACKEND
              const verifyRes = await Api.post("/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
                 await Api.post("/payment-success", {
                  user_id: user?.user_id || 1,
                  course_id: course.course_id,
                  payment_id: response.razorpay_payment_id,
                  email: billing.email,
                  phone: billing.phone
                });
              // 🔹 STEP 4: REDIRECT TO SUCCESS PAGE
              navigate("/paymentsuccess", {
                state: {
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  course: course
                }
              });
            } catch (err) {
              console.error("Verification failed:", err);
              alert("❌ Payment verification failed. Please contact support.");
            }
          },

          prefill: {
            name: billing.name,
            email: billing.email,
            contact: billing.phone
          },
          notes: {
            user_name: billing.name,
            user_email: billing.email,
            user_phone: billing.phone,
            course_name: course.course_title
          },

          theme: {
            color: "#7c3aed"
          },

          modal: {
            ondismiss: function () {
              setLoading(false);
              Api.post("/payment-failure", {
                  user_id: user?.user_id || 1,
                  course_id: course.course_id,
                  email: billing.email,
                  phone: billing.phone
                });

                alert("Payment cancelled");
          
            }
          }
        };

        // 🔹 RAZORPAY LOAD & OPEN
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        };
        document.body.appendChild(script);

      } catch (error) {
        const backendMessage = error?.response?.data?.detail;
        console.error("Payment error:", error);
        alert(`❌ ${backendMessage || "Failed to create payment order. Please try again."}`);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#141414] p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* BILLING SECTION */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg"
            >
              <h1 className="text-3xl font-bold mb-8">Billing Details</h1>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={billing.name}
                    onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={billing.email}
                    onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={billing.phone}
                    onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>TEST MODE:</strong> This is Razorpay test mode. 
                  Use test card details: 4111 1111 1111 1111
                </p>
              </div>
            </motion.div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* COURSE THUMBNAIL */}
              <img
                src={course.thumbnail_url}
                alt={course.course_title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* COURSE DETAILS */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
                  <p className="font-semibold">{course.course_title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-semibold">{course.category}</p>
                </div>

                <hr className="my-4 dark:border-gray-700" />

                {/* PRICE */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Course Price</span>
                  <span className="text-2xl font-bold text-green-600">₹{course.course_price}</span>
                </div>

                {/* PAYMENT BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Pay with Razorpay (Test Mode)"}
                </motion.button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  Secure payment powered by Razorpay • Test Mode Active
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }