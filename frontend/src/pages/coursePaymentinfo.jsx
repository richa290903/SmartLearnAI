// import React from "react";
// import { motion } from "framer-motion";
//  function CoursePaymentinfo() {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen">

// <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6 }}
// >

//   {/* Your content */}

//       {/* Navbar */}
//       <div className="bg-gray-800 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">MyCourses</h1>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-3 py-1 rounded bg-gray-700 outline-none"
//         />
//       </div>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

//         {/* LEFT CONTENT */}
//         <div className="md:col-span-2 space-y-4">

//           <p className="text-sm text-blue-400">Development &gt; Data Science</p>

//           <h1 className="text-3xl md:text-4xl font-bold">
//             Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2026]
//           </h1>

//           <p className="text-gray-300">
//             Learn to create Machine Learning Algorithms in Python & R from top Data Science experts.
//           </p>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-400 font-bold">4.5 ★</span>
//             <span className="text-gray-400">(100,000 students)</span>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-4">
//             <button className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700 transition">
//               Bestseller
//             </button>
//             <button className="border px-5 py-2 rounded hover:bg-gray-700 transition">
//               Wishlist
//             </button>
//           </div>
//         </div>

//         {/* RIGHT CARD */}
//         <div className="bg-white text-black rounded-xl shadow-lg p-4">

//           {/* Video Preview */}
//           <div className="relative">
//             <img
//               src="https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg"
//               alt="course"
//               className="rounded-lg"
//             />
//             <button className="absolute inset-0 flex items-center justify-center">
//               <div className="bg-black bg-opacity-60 p-4 rounded-full">
//                 ▶
//               </div>
//             </button>
//           </div>

//           {/* Price */}
//           <h2 className="text-2xl font-bold mt-4">₹400</h2>

//           {/* Button */}
//           <button className="w-full bg-purple-600 text-white py-2 rounded mt-3 hover:bg-purple-700 transition">
//             Buy Now
//           </button>

//           <p className="text-sm text-gray-600 mt-2 text-center">
//             30-Day Money-Back Guarantee
//           </p>
//         </div>
//       </div>
//       </motion.div>
//     </div>
//   );
// }export default CoursePaymentinfo;

import React from "react";
import { motion } from "framer-motion";

export default function CoursePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* Navbar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MyCourses</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded bg-gray-700 outline-none"
        />
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <motion.div
          className="md:col-span-2 space-y-4"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Breadcrumb */}
          <p className="text-sm text-blue-400">
            Development &gt; Data Science &gt; Machine Learning
          </p>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2026]
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg">
            Learn to create Machine Learning Algorithms in Python and R from scratch.
            Master Data Science step by step.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-400 font-bold">4.5 ★</span>
            <span className="text-blue-400 underline cursor-pointer">
              120,000 ratings
            </span>
            <span className="text-gray-400">(500,000 students)</span>
          </div>

          {/* Instructor */}
          <p className="text-sm text-gray-300">
            Created by{" "}
            <span className="text-blue-400 underline cursor-pointer">
              John Doe
            </span>
          </p>

          {/* Extra Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>🕒 Last updated 3/2026</span>
            <span>🌐 English</span>
          </div>
        </motion.div>

        {/* RIGHT SIDE CARD */}
        <motion.div
          className="bg-white text-black rounded-xl shadow-lg p-4 h-fit md:sticky md:top-20"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Video Preview */}
          <div className="relative">
            <img
              src="https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg"
              alt="course"
              className="rounded-lg"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-60 p-4 rounded-full text-white text-xl">
                ▶
              </div>
            </button>
          </div>

          {/* Price */}
          <h2 className="text-2xl font-bold mt-4">₹400</h2>

          {/* Buy Button */}
          <button className="w-full bg-purple-600 text-white py-2 rounded mt-3 hover:bg-purple-700 transition">
            Buy Now
          </button>

          <p className="text-sm text-gray-600 mt-2 text-center">
            30-Day Money-Back Guarantee
          </p>
        </motion.div>
      </div>
    </div>
  );
}