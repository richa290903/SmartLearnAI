import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import Api from "../services/Api";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CoursePaymentinfo() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [hideVideo, setHideVideo] = useState(false);


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

 
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await Api.get(`/single_video_data/${course_id}`);
        setCourse(response.data);
      } catch (err) {
        setError("Failed to load course details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (course_id) {
      fetchCourse();
    } else {
      setError("Invalid course ID");
      setLoading(false);
    }
  }, [course_id]);

 
  useEffect(() => {
    const handleScroll = () => setHideVideo(window.scrollY > 550);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBuyNow = () => {
    navigate("/payment", { state: { course } });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading course...</p>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <p className="text-red-500 text-lg">{error || "Course not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0a0a0a]   text-black dark:text-white font-[Inter] transition-colors duration-300">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
        >
          {course.course_title}
          <span className="block text-xl md:text-3xl font-light text-gray-600 dark:text-gray-400 mt-2">
            {course.category} • {course.skill_level}
          </span>
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-gray-700 dark:text-gray-300 mt-4 text-base md:text-lg max-w-3xl"
        >
          {course.description}
        </motion.p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-4">

        {/* LEFT SIDE PAYMENT CARD */}
        <div className="w-full lg:w-[32%]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="sticky top-10 w-full max-w-xs mx-auto lg:mx-0"
          >
            <div className="rounded-2xl bg-gray-100/70 dark:bg-[#0f0f14]/70 
                            border border-black/10 dark:border-white/10 
                            backdrop-blur-xl shadow-2xl overflow-hidden transition-colors duration-300">

              {/* VIDEO THUMBNAIL */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: hideVideo ? 0 : 1,
                  height: hideVideo ? 0 : "auto"
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail_url || "/images/default.png"}
                    alt={course.course_title}
                    className="w-full h-56 object-cover brightness-90 hover:brightness-110 duration-300"
                  />
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full 
                                  border border-white/30 shadow-xl 
                                  text-3xl text-white hover:scale-110 duration-300 cursor-pointer">
                      ▶
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* PAYMENT BOX */}
              <div className="p-6 space-y-5">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                  ₹{course.course_price}
                </h2>

                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>✔ Full lifetime access</li>
                  <li>✔ Premium course content</li>
                  <li>✔ Certificate of completion</li>
                  <li>✔ 24/7 access anytime</li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-xl 
                           font-semibold shadow-lg hover:shadow-purple-500/40 duration-300 transition-all"
                >
                  Proceed to Pay
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-full lg:w-[60%] space-y-12">

          {/* COURSE INFO */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="flex flex-col sm:flex-row gap-10 bg-gray-100 dark:bg-[#141414] p-6 rounded-xl shadow-lg 
                     border border-black/10 dark:border-white/10 transition-colors duration-300"
          >
            <div>
              <p className="text-4xl font-black text-purple-500">⭐ 4.7</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">250k+ Ratings</p>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-gray-100">1.4M</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Learners</p>
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-500">{course.skill_level}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Skill Level</p>
            </div>
          </motion.div>

          {/* COURSE DESCRIPTION */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="bg-gray-100 dark:bg-[#141414] p-8 rounded-xl 
                     border border-black/10 dark:border-white/10 shadow-xl 
                     transition-colors duration-300"
          >
            <h2 className="text-3xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {course.description}
            </p>
          </motion.div>

          {/* PREREQUISITES */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="bg-gray-100 dark:bg-[#141414] p-8 rounded-xl 
                     border border-black/10 dark:border-white/10 shadow-xl 
                     transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {course.prerequisites || "No specific prerequisites required"}
            </p>
          </motion.div>

          {/* WHAT YOU'LL LEARN */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="bg-gray-100 dark:bg-[#141414] p-8 rounded-xl 
                     border border-black/10 dark:border-white/10 shadow-xl 
                     transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm">
              {course.tag?.split(",").slice(0, 8).map((tag, i) => (
                <motion.p
                  key={i}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-purple-500">✓</span> {tag.trim()}
                </motion.p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
