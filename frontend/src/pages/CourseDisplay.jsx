import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CoursePaymentinfo() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [hideVideo, setHideVideo] = useState(false);

  console.log("Course ID:", courseId);

  // Scroll hide video
  useEffect(() => {
    const scroll = () => setHideVideo(window.scrollY > 550);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  // Course Data
  const course = {
    id: courseId,
    title: "Machine Learning A-Z",
    price: 399,
  };

  const handleBuyNow = () => {
    navigate("/payment", { state: { course } });
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-[Inter]">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-5xl font-bold text-gray-900"
        >
          {course.title}
        </motion.h1>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 flex gap-12">

        {/* LEFT CARD */}
        <div className="w-[32%]">
          <motion.div className="sticky top-10 w-[340px] mx-auto">

            <div className="rounded-2xl bg-[#f6f6f6] border border-black/10 shadow-lg overflow-hidden">

              {/* VIDEO */}
              {!hideVideo && (
                <img
                  src="https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg"
                  className="w-full"
                />
              )}

              {/* PAYMENT */}
              <div className="p-6 space-y-5">
                <h2 className="text-3xl font-bold text-purple-600">
                  ₹{course.price}
                </h2>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                >
                  Buy Now
                </button>
              </div>

            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-[60%] space-y-10">

          {/* STATS */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="flex gap-10 bg-[#f6f6f6] p-6 rounded-xl border border-black/10 shadow-sm"
          >
            <div>
              <p className="text-3xl font-bold text-red-500">4.7 ⭐</p>
              <p className="text-sm text-gray-600">250k+ Ratings</p>
            </div>

            <div>
              <p className="text-3xl font-bold">1.4M</p>
              <p className="text-sm text-gray-600">Learners</p>
            </div>
          </motion.div>

          {/* WHAT YOU’LL LEARN */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="bg-[#f6f6f6] p-6 rounded-xl border border-black/10 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              What You’ll Learn
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              {[ 
                "ML models",
                "Deep Learning",
                "Python",
                "Projects",
                "AI tools",
                "Pipelines",
                "Tuning",
                "Deployment"
              ].map((item, i) => (
                <p key={i}>✔ {item}</p>
              ))}
            </div>
          </motion.div>

          {/* SECTIONS */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Course Sections
            </h2>

            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                className="bg-[#f6f6f6] p-4 mb-3 rounded-lg border border-black/10 shadow-sm"
              >
                Section {i + 1}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}


