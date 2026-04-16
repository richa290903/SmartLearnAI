import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Api from "../services/Api";
import axios from "axios";
import VideoJS from "../components/videoJS";
import { useTheme } from "../context/ThemeContext";

function CourseDetail() {
  const { id } = useParams();
  const { theme } = useTheme();
  const playerRef = useRef(null);
    const [course, setCourse] = useState(null);
  const [coursedata, setCourseData] = useState([]);
  const playerContainerRef = useRef(null);
  /* ------------------ 1. Fetch all courses ------------------ */
  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get("/course_display");
      setCourseData(response.data);
    };
    fetchData();
  }, []);

  /* ------------------ 2. Fetch single course ------------------ */
  useEffect(() => {
    setCourse(null);

    axios
      .get(`http://localhost:8000/single_video_data/${id}`)
      .then((res) => {
        setCourse(res.data);

        setTimeout(() => {
          playerContainerRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
      })
      .catch((err) => console.log(err));
  }, [id]);

  /* ------------------ Loading UI ------------------ */
  if (!course) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading course...
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-gray-100 text-gray-900"}`}>

      {/* HEADER */}
      <header className={`w-full fixed top-0 left-0 py-3 px-5 md:px-10 flex items-center justify-between z-50 backdrop-blur-sm shadow-sm transition-colors duration-300 ${theme === "dark" ? "bg-slate-950/80 border-b border-gray-800 text-slate-100" : "bg-white/70 text-gray-900"}`}>
        
        <div className="flex items-center gap-4">
          <Link to={"/"} />
          <div className=" px-8 flex items-center gap-1 cursor-pointer">
            <h2 className=" text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent">SmartLearn</h2>
            <span className="text-xs font-bold text-gray-600">AI</span>
          </div>
        </div>

        <h1 className="hidden md:block text-lg font-semibold text-gray-900 truncate max-w-[400px]">
          {course.course_title}
        </h1>

        <div className="flex items-center gap-3 hover:bg-gray-100 px-3 py-1 rounded-lg transition">
          <img src="/images/author_logo.png" className="w-10 h-10 rounded-full border shadow" />
          <div>
            <p className="text-sm font-semibold">{course.author}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl pt-28 px-4 md:px-8 pb-16 space-y-10">

        {/* VIDEO */}
        <div className="bg-slate-900 aspect-video rounded-xl shadow" style={{ maxWidth: "1200px", maxHeight:"480px" }}>
          <div ref={playerContainerRef}>
            {course?.video_url && (
              <VideoJS
                options={{
                  controls: true,
                  responsive: true,
                  fluid:true,
                  width: 1200,
                  height: 500,
                  sources: [
                    {
                      src: course.video_url,
                      type: "video/mp4",
                    },
                  ],
                }}
                onReady={(player) => {
                  playerRef.current = player;

                  let lastSaveTime = 0;

                  // RESUME VIDEO
                  player.ready(() => {
                    fetch(`http://localhost:8000/get-progress/1/${course.course_id}`)
                      .then((res) => res.json())
                      .then((data) => {
                        if (data?.last_position > 2) {
                          player.currentTime(data.last_position);
                          console.log("Resumed at:", data.last_position);
                        }
                      })
                      .catch((err) => console.log(err));
                  });

                  // SAVE PROGRESS
                  player.on("timeupdate", () => {
                    const now = Date.now();
                    if (now - lastSaveTime < 2000) return;

                    lastSaveTime = now;

                    const currentTime = Math.floor(player.currentTime());

                    fetch("http://localhost:8000/save-progress", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        user_id: 1,
                        course_id: course.course_id,
                        last_position: currentTime,
                      }),
                    }).catch((err) => console.log(err));
                  });

                  player.on("waiting", () => console.log("Buffering..."));
                  player.on("dispose", () => console.log("Disposed"));
                }}
              />
            )}
          </div>
        </div>

        {/* COURSE DETAILS */}
        <div className={`rounded-xl shadow p-6 md:p-8 space-y-6 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
          <div className={`flex justify-between items-center border-b pb-5 flex-wrap gap-4 transition-colors duration-300 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <div>
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{course.author}</h2>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{course.course_date}</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow hover:opacity-90">
              ₹{course.course_price}
            </button>
          </div>

          <div>
            <h3 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>About this Course</h3>
            <p className={`leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>You learn in this course: {course.tag}</p>
            <p className={`leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{course.description}</p>
          </div>
        </div>
              
         {/* MORE COURSES */}
           <div className={`rounded-xl shadow p-6 space-y-6 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>
           <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>More Courses</h3>

          {coursedata
            .filter((c) => c.course_id !== Number(id))
            .map((data) => (
              <Link
                to={`/coursedetail/${data.course_id}`}
                key={data.course_id}
                className={`block rounded-xl overflow-hidden shadow-md transition ${theme === "dark" ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:shadow-xl"}`}
              >
                <div className={`flex gap-4 p-3 rounded-lg transition ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                  <div className="w-32 h-20 md:w-40 md:h-28 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={"http://localhost:8000/Thumbnail/" + data.thumbnail}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <h4 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {data.course_title}
                    </h4>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Skill Level: {data.skill_level}
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {data.course_date}
                    </p>
                  </div>

                  <div className="text-gray-600 text-xl">⋮</div>
                </div>
              </Link>
            ))}
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;      