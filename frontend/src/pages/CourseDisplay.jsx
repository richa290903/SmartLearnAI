// import { Link, useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import Api from "../services/Api.jsx";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";

// function CourseDisplay() {
//   const { id } = useParams();

//   const [coursedata, setCourseData] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [userRating, setUserRating] = useState(0);
//   const [modules, setModules] = useState([]);
//   const [activeVideo, setActiveVideo] = useState("");
//   const videoUrl = course.video_url;

//   const videoRef = useRef(null);

//   //  TRACK WATCH TIME (FIXED)
//   useEffect(() => {
//     if (!course) return;

//     const video = videoRef.current;
//     if (!video) return;

//     let lastSaveTime = 0;
//     let lastTrackedTime = 0; //  IMPORTANT FIX

//     const handleTimeUpdate = () => {
//       const now = Date.now();

//       if (now - lastSaveTime < 5000) return; // every 5 sec
//       lastSaveTime = now;

//       const currentTime = Math.floor(video.currentTime);
//       const duration = video.duration;

//       if (!duration) return;

//       //  SEND ONLY DIFFERENCE (NOT FULL TIME)
//       const watchDelta = currentTime - lastTrackedTime;
//       lastTrackedTime = currentTime;

//       if (watchDelta <= 0) return;

//       const progress = (currentTime / duration) * 100;

//       console.log("TRACK API CALL");
//       console.log("DELTA:", watchDelta);
//       console.log("PROGRESS:", progress);

//       Api.post(
//         `/track_course_view/${course.course_id}`,
//         {
//           watch_time: watchDelta,
//           progress: progress
//         },
//         {
//           withCredentials: true //  FIXED POSITION
//         }
//       )
//         .then((res) => console.log("SUCCESS:", res.data))
//         .catch((err) => {
//           console.log("ERROR:", err.response?.data);
//         });
//     };

//     video.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       video.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [course]);

//   // ✅ FETCH ALL COURSES
//   useEffect(() => {
//     Api.get("/course_display")
//       .then((res) => setCourseData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   //  FETCH SINGLE COURSE
//   useEffect(() => {
//   if (!id) return;

//   axios
//     .get(`http://localhost:8000/single_video_data/${id}`)
//     .then((res) => {
//       setCourse(res.data);
//       setActiveVideo(res.data.video_url); // ✅ default video
//     })
//     .catch((err) => console.log(err));
// }, [id]);
//   useEffect(() => {
//   if (!id) return;

//   Api.get(`/module/get_course_module/${id}`)
//     .then((res) => {
//       console.log("Modules:", res.data);
//       setModules(res.data.modules);
//     })
//     .catch((err) => {
//       console.log("Module Fetch Error:", err);
//     });
// }, [id]);



//   //  RATING
//   const handleRating = async (value) => {
//     try {
//       setUserRating(value);

//       await Api.post("/rate_course", {
//         course_id: course.course_id,
//         rating: value
//       });

//       const res = await axios.get(
//         `http://localhost:8000/single_video_data/${id}`
//       );
//       setCourse(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!course) {
//     return <div className="text-center mt-20 text-xl">Loading course...</div>;
//   }


//   return (
//     <div className="w-full min-h-screen bg-gray-100">
//       <div className="mx-auto max-w-6xl pt-28 px-4 md:px-8 pb-16 space-y-10">

//         {/* 🎬 VIDEO */}
//         <div className="w-full bg-black rounded-xl shadow overflow-hidden">
//           <video
//   ref={videoRef}
//   src={activeVideo || course.video_url}
//   className="w-full h-[260px] md:h-[480px] object-cover"
//   controls
// >
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//         </div>

//         {/* ⭐ RATING */}
//         <div className="bg-white rounded-xl shadow p-6 space-y-4">
//           <div className="flex items-center gap-3">
//             {[1, 2, 3, 4, 5].map((star) => {
//               const isFull = userRating >= star;
//               const isHalf = userRating >= star - 0.5;

//               return (
//                 <div key={star} className="relative cursor-pointer group">

//                   {/* Half click */}
//                   <div
//                     className="absolute w-1/2 h-full z-10"
//                     onClick={() => handleRating(star - 0.5)}
//                   ></div>

//                   <FaStar
//                     className={`text-3xl transition ${
//                       isFull
//                         ? "text-yellow-500"
//                         : isHalf
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                     onClick={() => handleRating(star)}
//                   />
//                 </div>
//               );
//             })}

//             <div className="ml-4">
//               <p className="text-sm text-gray-600">
//                 {userRating ? `${userRating} / 5` : "Rate this course"}
//               </p>

//               <p className="text-xs text-gray-500">
//                 ⭐ {course.rating || 0} ({course.total_reviews || 0} reviews)
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 📘 COURSE DETAILS */}
//         <div className="bg-white rounded-xl shadow p-6 space-y-6">
//           <div className="flex justify-between flex-wrap gap-4 border-b pb-4">
//             <div>
//               <h2 className="text-xl font-bold">{course.author}</h2>
//               <p className="text-sm text-gray-600">{course.course_date}</p>
//             </div>

//             <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
//               ₹{course.course_price}
//             </button>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold">About Course</h3>
//             <p className="text-gray-700">{course.description}</p>
//           </div>
//         </div>

//         {/* 📚 MORE COURSES */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-xl font-semibold mb-4">More Courses</h3>

//           {coursedata
//             .filter((c) => c.course_id !== Number(id))
//             .map((data) => (
//               <Link
//                 to={`/coursedisplay/${data.course_id}`}
//                 key={data.course_id}
//                 className="block p-3 hover:bg-gray-50 rounded-lg"
//               >
//                 <div className="flex gap-4">
//                   <img
//                     src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                     className="w-32 h-20 object-cover rounded"
//                   />

//                   <div>
//                     <h4 className="font-semibold">
//                       {data.course_title}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       {data.skill_level}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//         </div>

//       </div>







//       {/* 📚 MODULE LIST */}
// <div className="bg-white rounded-xl shadow p-6 mt-6">
//   <h3 className="text-xl font-semibold mb-4">Course Modules</h3>

//   {modules.length > 0 ? (
//     <div className="space-y-4">
//       {modules.map((mod, index) => (
//         <div
//           key={mod.module_id}
//           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
//           onClick={() =>
//             setActiveVideo(
//               `http://localhost:8000/SharedVideos/ModuleVideos/${mod.video}`
//             )
//           }
//         >
//           {/* Thumbnail */}
//           <img
//             src={`http://localhost:8000/SharedVideos/ModuleThumbnail/${mod.thumbnail}`}
//             className="w-20 h-14 object-cover rounded"
//           />

//           {/* Info */}
//           <div>
//             <h4 className="font-semibold text-sm">
//               {index + 1}. {mod.title}
//             </h4>
//             <p className="text-xs text-gray-500">
//               {mod.description}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p className="text-gray-500">No modules found</p>
//   )}
// </div>
//     </div>
//   );
// }

// export default CourseDisplay;


// import { Link, useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import Api from "../services/Api.jsx";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";

// function CourseDisplay() {
//   const { course_id } = useParams();
//   const [coursedata, setCourseData] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [activeVideo, setActiveVideo] = useState("");
//   const [userRating, setUserRating] = useState(0);

//   const videoRef = useRef(null);

//   // ✅ FETCH COURSE
//   useEffect(() => {
//     if (!course_id) return;

//     axios
//       .get(`http://localhost:8000/single_video_data/${course_id}`)
//       .then((res) => {
//         setCourse(res.data);
//         setActiveVideo(res.data.video_url); // default video
//       })
//       .catch((err) => console.log(err));
//   }, [course_id]);

//   // ✅ FETCH MODULES
//   useEffect(() => {
//     if (!course_id) return;

//     Api.get(`/module/get_course_module/${course_id}`) // change if no prefix
//       .then((res) => {
//         console.log("Modules:", res.data);
//         setModules(res.data.modules || []);
//       })
//       .catch((err) => {
//         console.log("Module Fetch Error:", err);
//       });
//   }, [course_id]);

//   // ✅ FETCH ALL COURSES
//   useEffect(() => {
//     Api.get("/course_display")
//       .then((res) => setCourseData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   // ✅ WATCH TRACKING
//   useEffect(() => {
//     if (!course) return;

//     const video = videoRef.current;
//     if (!video) return;

//     let lastSaveTime = 0;
//     let lastTrackedTime = 0;

//     const handleTimeUpdate = () => {
//       const now = Date.now();
//       if (now - lastSaveTime < 5000) return;

//       lastSaveTime = now;

//       const currentTime = Math.floor(video.currentTime);
//       const duration = video.duration;
//       if (!duration) return;

//       const watchDelta = currentTime - lastTrackedTime;
//       lastTrackedTime = currentTime;

//       if (watchDelta <= 0) return;

//       const progress = (currentTime / duration) * 100;

//       Api.post(
//         `/track_course_view/${course.course_id}`,
//         {
//           watch_time: watchDelta,
//           progress: progress
//         },
//         { withCredentials: true }
//       ).catch((err) => console.log(err));
//     };

//     video.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       video.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [course]);

//   // ✅ RATING
//   const handleRating = async (value) => {
//     try {
//       setUserRating(value);

//       await Api.post("/rate_course", {
//         course_id: course.course_id,
//         rating: value
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!course) {
//     return <div className="text-center mt-20 text-xl">Loading...</div>;
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-100">
//       <div className="mx-auto max-w-6xl pt-24 px-4 space-y-8">

//         {/* 🎬 VIDEO */}
//         <div className="bg-black rounded-xl overflow-hidden shadow">
//           <video
//             ref={videoRef}
//             src={activeVideo}
//             controls
//             className="w-full h-[300px] md:h-[500px] object-cover"
//           />
//         </div>

//         {/* ⭐ RATING */}
//         <div className="bg-white p-5 rounded-xl shadow flex items-center gap-3">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//               key={star}
//               onClick={() => handleRating(star)}
//               className={`text-2xl cursor-pointer ${
//                 userRating >= star ? "text-yellow-500" : "text-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         {/* 📘 COURSE DETAILS */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-bold">{course.course_title}</h2>
//           <p className="text-gray-600 mt-2">{course.description}</p>
//         </div>

//         {/* 📚 MODULE LIST */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-xl font-semibold mb-4">Course Modules</h3>

//           {modules.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-4">
//               {modules.map((mod, index) => (
//                 <div
//                   key={mod.module_id}
//                   onClick={() =>
//                     setActiveVideo(
//                       `http://localhost:8000/SharedVideos/ModuleVideos/${mod.video}`
//                     )
//                   }
//                   className="flex gap-3 border p-3 rounded-lg cursor-pointer hover:bg-purple-50 transition"
//                 >
//                   <img
//                     src={`http://localhost:8000/SharedVideos/ModuleThumbnail/${mod.thumbnail}`}
//                     className="w-24 h-16 object-cover rounded"
//                   />

//                   <div>
//                     <h4 className="font-semibold text-sm">
//                       {index + 1}. {mod.title}
//                     </h4>
//                     <p className="text-xs text-gray-500">
//                       {mod.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No modules found</p>
//           )}
//         </div>

//         {/* 📚 MORE COURSES */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-xl font-semibold mb-4">More Courses</h3>

//           {coursedata
//             .filter((c) => c.course_id !== Number(id))
//             .map((data) => (
//               <Link
//                 key={data.course_id}
//                 to={`/coursedisplay/${data.course_id}`}
//                 className="flex gap-4 p-2 hover:bg-gray-50 rounded"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="w-28 h-16 object-cover rounded"
//                 />

//                 <div>
//                   <h4 className="font-semibold">{data.course_title}</h4>
//                   <p className="text-sm text-gray-500">
//                     {data.skill_level}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default CourseDisplay;








// import { Link, useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import Api from "../services/Api.jsx";
// import axios from "axios";
// import { FaStar, FaPlay } from "react-icons/fa";
// import { motion } from "framer-motion";

// function CourseDisplay() {
//   const { course_id } = useParams();

//   const [coursedata, setCourseData] = useState([]);
//   const [course, setCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [activeVideo, setActiveVideo] = useState("");
//   const [userRating, setUserRating] = useState(0);

//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (!course_id) return;

//     axios
//       .get(`http://localhost:8000/single_video_data/${course_id}`)
//       .then((res) => {
//         setCourse(res.data);
//         setActiveVideo(res.data.video_url);
//       })
//       .catch(console.log);
//   }, [course_id]);

//   useEffect(() => {
//     if (!course_id) return;

//     Api.get(`/module/get_course_module/${course_id}`)
//       .then((res) => setModules(res.data.modules || []))
//       .catch(console.log);
//   }, [course_id]);

//   useEffect(() => {
//     Api.get("/course_display")
//       .then((res) => setCourseData(res.data))
//       .catch(console.log);
//   }, []);

//   useEffect(() => {
//     if (!course || !videoRef.current) return;

//     const video = videoRef.current;
//     let lastTime = 0;

//     const handleTimeUpdate = () => {
//       const currentTime = Math.floor(video.currentTime);
//       const duration = video.duration;

//       if (!duration || currentTime === lastTime) return;

//       lastTime = currentTime;

//       Api.post(`/track_course_view/${course.course_id}`, {
//         watch_time: 1,
//         progress: (currentTime / duration) * 100,
//       }).catch(() => {});
//     };

//     video.addEventListener("timeupdate", handleTimeUpdate);
//     return () => video.removeEventListener("timeupdate", handleTimeUpdate);
//   }, [course]);

//   const handleRating = async (value) => {
//     setUserRating(value);
//     try {
//       await Api.post("/rate_course", {
//         course_id: course.course_id,
//         rating: value,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!course) {
//     return (
//       <div className="text-white text-center mt-20 text-xl">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#0f172a] min-h-screen text-white p-6">

//     {/* 🎬 VIDEO + INFO STACKED UI */}
// <div className="max-w-6xl mx-auto mt-6 space-y-6">

//   {/* 🎬 VIDEO CARD */}
//   <motion.div
//     initial={{ opacity: 0, y: -30 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileHover={{ scale: 1.01 }}
//     className="rounded-2xl overflow-hidden shadow-2xl border bg-black"
//   >
//     <video
//       ref={videoRef}
//       src={activeVideo}
//       controls
//       className="w-full h-[240px] md:h-[420px] object-cover"
//     />
//   </motion.div>

//   {/* 📘 TITLE + DESCRIPTION (BELOW VIDEO) */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-white rounded-2xl shadow-lg p-6 space-y-3"
//   >
//     <h1 className="text-3xl font-bold text-gray-900">
//       {course.course_title}
//     </h1>

//     <p className="text-gray-600 leading-relaxed">
//       {course.description}
//     </p>
//   </motion.div>

//   {/* ⭐ RATING CARD (PRO UI) */}
// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   whileHover={{ scale: 1.01 }}
//   className="relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
// >

//   {/* LEFT SIDE */}
//   <div>
//     <h3 className="text-lg font-semibold text-gray-900">
//       ⭐ Rate this course
//     </h3>
//     <p className="text-sm text-gray-500">
//       Share your feedback to help others learn better
//     </p>
//   </div>

//   {/* RIGHT SIDE STARS */}
//   <div className="flex items-center gap-2">

//     {[1, 2, 3, 4, 5].map((star) => (
//       <motion.div
//         key={star}
//         whileHover={{ scale: 1.4, rotate: 8 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <FaStar
//           onClick={() => handleRating(star)}
//           className={`cursor-pointer text-3xl transition-all duration-300 ${
//             userRating >= star
//               ? "text-yellow-400 drop-shadow-md"
//               : "text-gray-300 hover:text-yellow-300"
//           }`}
//         />
//       </motion.div>
//     ))}

//   </div>

//   {/* OPTIONAL: SHOW CURRENT RATING */}
//   <div className="absolute top-3 right-4 text-xs text-gray-500">
//     Your Rating:{" "}
//     <span className="font-semibold text-yellow-500">
//       {userRating || 0}/5
//     </span>
//   </div>

// </motion.div>
// </div>
//       {/* 📚 MODULES */}
//       <div className="max-w-5xl mx-auto mt-12">

//         {/* NEW HEADING */}
//         <h2 className="text-2xl text-gray-500 mb-6">
//           Course Modules
//         </h2>

//         <div className="space-y-4">
//           {modules.map((mod, index) => (
//             <motion.div
//               key={mod.module_id}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() =>
//                 setActiveVideo(
//                   `http://localhost:8000/SharedVideos/ModuleVideos/${mod.video}`
//                 )
//               }
//               className="flex gap-4 items-center bg-[#1e293b] p-4 rounded-xl cursor-pointer border border-gray-700 hover:bg-[#334155]"
//             >
//               <img
//                 src={`http://localhost:8000/ModuleThumbnail/${mod.thumbnail}`}
//                 className="w-32 h-20 object-cover rounded-lg"
//               />

//               {/* TITLE + DESCRIPTION ADDED */}
//             <div className="flex-1">
//               {/* TITLE */}
//               <h3 className="text-base text-gray-700 leading-snug font-semibold   line-clamp-1">
//                 {mod.title}
//               </h3>

//               {/*  DESCRIPTION */}
//               <p className="text-gray-400 text-sm mt-1 leading-relaxed line-clamp-2">
//                 {mod.description}
//               </p>

//             </div>

//               <FaPlay className="text-gray-400" />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* 🎯 RELATED COURSES */}
//       <div className="max-w-7xl mx-auto mt-12 pb-10">

//         {/* NEW HEADING */}
//         <h2 className="text-2xl text-gray-500 mb-6">
//           🎬 Recommended Courses
//         </h2>

//         <div className="flex gap-5 overflow-x-auto">
//           {coursedata
//             .filter((c) => c.course_id !== Number(course_id))
//             .map((data) => (
//               <motion.div
//                 key={data.course_id}
//                 whileHover={{ scale: 1.08 }}
//                 className="min-w-[260px] bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700"
//               >
//                 <Link to={`/coursedetail/${data.course_id}`}>
//                   <img
//                     src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                     className="w-full h-36 object-cover"
//                   />
//                   <div className="p-3">
//                     <h3 className="font-semibold text-sm">
//                       {data.course_title}
//                     </h3>
//                     <p className="text-gray-400 text-xs">
//                       {data.skill_level}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseDisplay;



import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Api from "../services/Api.jsx";
import axios from "axios";
import { FaStar, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";


function CourseDisplay() {
  const { course_id } = useParams();

  const [coursedata, setCourseData] = useState([]);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeVideo, setActiveVideo] = useState("");
  const [userRating, setUserRating] = useState(0);

  const videoRef = useRef(null);

  // FETCH COURSE
  useEffect(() => {
    if (!course_id) return;

    axios
      .get(`http://localhost:8000/single_video_data/${course_id}`)
      .then((res) => {
        setCourse(res.data);
        setActiveVideo(res.data.video_url);
        setUserRating(res.data.rating || 0); // ✅ load rating
      })
      .catch(console.log);
  }, [course_id]);

  // FETCH MODULES
  useEffect(() => {
    if (!course_id) return;

    Api.get(`/module/get_course_module/${course_id}`)
      .then((res) => setModules(res.data.modules || []))
      .catch(console.log);
  }, [course_id]);

  // FETCH COURSES
  useEffect(() => {
    Api.get("/course_display")
      .then((res) => setCourseData(res.data))
      .catch(console.log);
  }, []);

  // WATCH TRACKING
  useEffect(() => {
    if (!course || !videoRef.current) return;

    const video = videoRef.current;
    let lastTime = 0;

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(video.currentTime);
      const duration = video.duration;

      if (!duration || currentTime === lastTime) return;

      lastTime = currentTime;

      Api.post(`/track_course_view/${course.course_id}`, {
        watch_time: 1,
        progress: (currentTime / duration) * 100,
      }).catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [course]);

  // RATING
  const handleRating = async (value) => {
    setUserRating(value);
    try {
      await Api.post(`/rate_course/${course.course_id}?rating=${value}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] min-h-screen text-white p-6">

      {/* 🎬 VIDEO + INFO */}
      <div className="max-w-6xl mx-auto space-y-6">

        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
        >
          <video
            ref={videoRef}
            src={activeVideo}
            controls
            className="w-full h-[250px] md:h-[420px] object-cover"
          />
        </motion.div>

        {/* COURSE INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-black rounded-2xl shadow-xl p-6"
        >
          <h1 className="text-3xl text-gray-800 font-bold mb-2">
            {course.course_title}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {course.description}
          </p>
        </motion.div>

        {/*  RATING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold"> Rate this course</h3>
            <p className="text-sm text-gray-400">
              Your feedback matters
            </p>
          </div>

          <div className="flex gap-2">
            {[1,2,3,4,5].map((star) => (
              <motion.div key={star} whileHover={{ scale: 1.3 }}>
                <FaStar
                  onClick={() => handleRating(star)}
                  className={`cursor-pointer text-2xl ${
                    userRating >= star
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/*  MODULES */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl text-gray-800 font-semibold mb-6">
        Course Modules
        </h2>

        <div className="space-y-4">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.module_id}
              whileHover={{ scale: 1.02 }}
              onClick={() =>
                setActiveVideo(
                  `http://localhost:8000/SharedVideos/ModuleVideos/${mod.video}`
                )
              }
              className="flex gap-4 items-center bg-[#1e293b] p-4 rounded-xl border border-gray-700 hover:bg-[#334155] cursor-pointer"
            >
              <img
                src={`http://localhost:8000/ModuleThumbnail/${mod.thumbnail}`}
                className="w-32 h-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">
                  {index + 1}. {mod.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {mod.description}
                </p>
              </div>

              <FaPlay className="text-gray-400" />
            </motion.div>
          ))}
        </div>
      </div>

      {/*  RELATED COURSES */}
      <div className="max-w-6xl mx-auto mt-12 pb-10">
        <h2 className="text-2xl text-gray-800 font-semibold mb-6">
           Recommended Courses
        </h2>

        <div className="flex gap-5 overflow-x-auto">
          {coursedata
            .filter((c) => c.course_id !== Number(course_id))
            .map((data) => (
              <motion.div
                key={data.course_id}
                whileHover={{ scale: 1.08 }}
                className="min-w-[260px] bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700"
              >
                <Link to={`/coursedisplay/${data.course_id}`}>
                  <img
                    src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm">
                      {data.course_title}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {data.skill_level}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>

    </div>
  );
}

export default CourseDisplay;