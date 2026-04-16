// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Api from "../services/Api";
// import {
//   Code,
//   Brain,
//   Monitor,
//   Briefcase,
//   User,
//   Palette,
//   Megaphone,
// } from "lucide-react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

// const menuItems = ["All", "Beginner", "Intermediate", "Advanced"];
// const categories = [
//   { name: "Development", icon: <Code size={22} /> },
//   { name: "Artificial Intelligence & Data Science", icon: <Brain size={22} /> },
//   { name: "IT & Software", icon: <Monitor size={22} /> },
//   { name: "Business", icon: <Briefcase size={22} /> },
//   { name: "Personal Development", icon: <User size={22} /> },
//   { name: "Design", icon: <Palette size={22} /> },
//   { name: "Marketing", icon: <Megaphone size={22} /> },
// ];

// function AllCourses() {
//   const [active, setActive] = useState(0);
//   const [coursedata, setCourseData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const navigate = useNavigate();

//   // THEME
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [currentlyWatching, setCurrentlyWatching] = useState([]);
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const fetchdata = async () => {
//     const response = await Api.get("/course_display");
//     setCourseData(response.data);
//   };

//   const roleMap = [null, "Beginner", "Intermediate", "Advanced"];

//   const filteredCourses = Array.isArray(coursedata)
//     ? coursedata.filter((course) => {
//         const skillMatch =
//           roleMap[active] === null || course.skill_level === roleMap[active];
//         const categoryMatch =
//           selectedCategory === "All" || course.category === selectedCategory;
//         return skillMatch && categoryMatch;
//       })
//     : [];

//   useEffect(() => {
//     fetchdata();
//   }, []);

//   return (
//     <div className="flex fullscreen w-full min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
//       <div className="ml-20 md:ml-24 p-10 w-full">
//         <h1 className="text-3xl font-bold mb-4">All Courses</h1>

//         {/* Tabs */}
//         <div className="flex border-b dark:border-white/20 mb-6">
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setActive(index)}
//               className={`px-6 py-3 text-sm font-medium transition ${
//                 active === index
//                   ? "border-b-2 border-purple-600 text-purple-600"
//                   : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {/* Categories */}
//         <div className="flex gap-12 bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm mb-10 items-center transition-all">
//           {categories.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setSelectedCategory(item.name)}
//               className={`flex flex-col items-center cursor-pointer transition ${
//                 selectedCategory === item.name
//                   ? "text-blue-600"
//                   : "text-gray-600 dark:text-gray-300"
//               } hover:text-blue-600`}
//             >
//               <div className="mb-2">{item.icon}</div>
//               <p className="text-sm font-medium">{item.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* Course Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {coursedata.length > 0 ? (
//             filteredCourses.map((data) => (
//               <div
//                 className="hover:scale-105 transition-transform duration-300"
//                 key={data.course_id}
//               >
//                 <Link
//                   to={`/coursedisplay/${data.course_id}`}
//                   className="block bg-white dark:bg-[#1b1b1b] shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer border dark:border-white/10"
//                 >
//                   <div className="relative w-full overflow-hidden rounded-t-xl">
//                     <img
//                       src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                       alt={data.course_title}
//                       className="w-full h-50 object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                   </div>
//                 </Link>

//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight">
//                     {data.course_title}
//                   </h3>

//                   {/* Rating */}
//                   <div className="flex items-center gap-1 mt-1">
//                     {[1, 2, 3, 4, 5].map((star) => {
//                       const rating = data.rating || 0;

//                       if (rating >= star) {
//                         return <FaStar key={star} className="text-yellow-500" />;
//                       } else if (rating >= star - 0.5) {
//                         return <FaStarHalfAlt key={star} className="text-yellow-500" />;
//                       } else {
//                         return <FaRegStar key={star} className="text-yellow-500" />;
//                       }
//                     })}

//                     <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
//                       {(data.rating || 0).toFixed(1)}
//                     </span>
//                     <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//                       ({data.total_reviews || 0})
//                     </span>
//                   </div>

//                   <p className="font-bold text-yellow-600 dark:text-yellow-400 text-sm mt-1">
//                     {data.category}
//                   </p>

//                   <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
//                     For: {data.skill_level}
//                   </p>
//                   <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
//                     Prerequisites: {data.prerequisites}
//                   </p>

//                   <button
//                   // onClick={() =>
//                   //   navigate(`/coursepaymentinfo/${data.course_id}`, {
//                   //     state: {
//                   //       course: {
//                   //         id: data.course_id,
//                   //         name: data.course_title,
//                   //         price: data.price,
//                   //         category: data.category,
//                   //         thumbnail: `http://localhost:8000/Thumbnail/${data.thumbnail}` 
//                   //       }
//                   //     }
//                   //   })
//                   // }
//                 onClick={() =>
//                 navigate(`/coursepaymentinfo/${data.course_id}`, {
//                   state: {
//                     course: {
//                       id: data.course_id,
//                       name: data.course_title,
//                       price: data.course_price, // also fix this if needed
//                       category: data.category,
//                       thumbnail: data.thumbnail_url
//                     }
//                   }
//                 })
//               }
//                   className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-md mt-3">
//                     Premium
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600 dark:text-gray-300">No courses found.</p>
//           )}
//         </div>

//         {/* Grow in your roles */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold mb-4">Grow in your roles</h2>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {coursedata.slice(0, 5).map((data) => (
//               <div
//                 key={data.course_id}
//                 className="min-w-[260px] bg-white dark:bg-[#1b1b1b] rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer border dark:border-white/10"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="h-36 w-full object-cover rounded-lg"
//                 />
//                 <h3 className="font-semibold mt-2 text-gray-800 dark:text-gray-200">
//                   {data.course_title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recently Viewed */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold mb-4">Recently Viewed Products</h2>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {coursedata.slice(2, 7).map((data) => (
//               <div
//                 key={data.course_id}
//                 className="min-w-[210px] bg-white dark:bg-[#1b1b1b] rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer border dark:border-white/10"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="h-28 w-full object-cover rounded-lg"
//                 />
//                 <h3 className="font-semibold text-sm mt-2 text-gray-800 dark:text-gray-200">
//                   {data.course_title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Certificates */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold mb-4">Most Popular Certificates</h2>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {coursedata.slice(5, 10).map((data) => (
//               <div
//                 key={data.course_id}
//                 className="min-w-[250px] bg-white dark:bg-[#1b1b1b] rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer border dark:border-white/10"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="h-36 w-full object-cover rounded-lg"
//                 />
//                 <h3 className="font-semibold mt-2 text-gray-800 dark:text-gray-200">
//                   {data.course_title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Personalized */}
//         <div className="mt-20 mb-20">
//           <h2 className="text-2xl font-bold mb-4">
//             Personalized Specializations For You
//           </h2>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {coursedata.slice(3, 8).map((data) => (
//               <div
//                 key={data.course_id}
//                 className="min-w-[250px] bg-white dark:bg-[#1b1b1b] rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer border dark:border-white/10"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="h-36 w-full object-cover rounded-lg"
//                 />
//                 <h3 className="font-semibold mt-2 text-gray-800 dark:text-gray-200">
//                   {data.course_title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AllCourses;

// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Api from "../services/Api";
// import {
//   Code,
//   Brain,
//   Monitor,
//   Briefcase,
//   User,
//   Palette,
//   Megaphone,
// } from "lucide-react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const menuItems = ["All", "Beginner", "Intermediate", "Advanced"];

// const categories = [
//   { name: "Development", icon: <Code size={22} /> },
//   { name: "Artificial Intelligence & Data Science", icon: <Brain size={22} /> },
//   { name: "IT & Software", icon: <Monitor size={22} /> },
//   { name: "Business", icon: <Briefcase size={22} /> },
//   { name: "Personal Development", icon: <User size={22} /> },
//   { name: "Design", icon: <Palette size={22} /> },
//   { name: "Marketing", icon: <Megaphone size={22} /> },
// ];

// function AllCourses() {
//   const [active, setActive] = useState(0);
//   const [coursedata, setCourseData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [currentlyWatching, setCurrentlyWatching] = useState([]);

//   const navigate = useNavigate();

//   const fetchdata = async () => {
//     const response = await Api.get("/course_display");
//     setCourseData(response.data);
//   };

//   useEffect(() => {
//     fetchdata();
//     const watched = JSON.parse(localStorage.getItem("watching")) || [];
//     setCurrentlyWatching(watched);
//   }, []);

//   const roleMap = [null, "Beginner", "Intermediate", "Advanced"];

//   const filteredCourses = Array.isArray(coursedata)
//     ? coursedata.filter((course) => {
//         const skillMatch =
//           roleMap[active] === null || course.skill_level === roleMap[active];
//         const categoryMatch =
//           selectedCategory === "All" || course.category === selectedCategory;
//         return skillMatch && categoryMatch;
//       })
//     : [];

//   const handleWatch = (data) => {
//     let watched = JSON.parse(localStorage.getItem("watching")) || [];

//     if (!watched.find((item) => item.course_id === data.course_id)) {
//       watched.unshift(data);
//     }

//     localStorage.setItem("watching", JSON.stringify(watched));
//     setCurrentlyWatching(watched.slice(0, 8));
//   };

//   // ⭐ PREMIUM COURSE CARD
//   const CourseCard = ({ data }) => (
//     <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

//       <Link
//         to={`/coursedisplay/${data.course_id}`}
//         onClick={() => handleWatch(data)}
//       >
//         <div className="w-full h-44 overflow-hidden">
//           <img
//             src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//             alt={data.course_title}
//             className="w-full h-full object-cover hover:scale-105 transition duration-500"
//           />
//         </div>
//       </Link>

//       <div className="p-4">
//         <h3 className="font-semibold text-[15px] leading-snug text-gray-800 dark:text-gray-100 line-clamp-2">
//           {data.course_title}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1 mt-2">
//           {[1, 2, 3, 4, 5].map((star) => {
//             const rating = data.rating || 0;

//             if (rating >= star) {
//               return <FaStar key={star} className="text-yellow-400 text-xs" />;
//             } else if (rating >= star - 0.5) {
//               return <FaStarHalfAlt key={star} className="text-yellow-400 text-xs" />;
//             } else {
//               return <FaRegStar key={star} className="text-gray-300 text-xs" />;
//             }
//           })}

//           <span className="text-xs text-gray-500 ml-1">
//             {(data.rating || 0).toFixed(1)} ({data.total_reviews || 0})
//           </span>
//         </div>

//         {/* Category */}
//         <div className="mt-2">
//           <span className="text-[11px] px-2 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
//             {data.category}
//           </span>
//         </div>

//         <p className="text-xs text-gray-500 mt-2">
//           Level: {data.skill_level}
//         </p>

//         <p className="text-xs text-gray-400 mt-1 line-clamp-1">
//           {data.prerequisites}
//         </p>

//         {/* Price + Button */}
//         <div className="flex items-center justify-between mt-4">
//           <span className="font-bold text-gray-900 dark:text-white">
//             ₹{data.course_price || "Free"}
//           </span>

//           <button
//             onClick={() =>
//               navigate(`/coursepaymentinfo/${data.course_id}`, {
//                 state: {
//                   course: {
//                     id: data.course_id,
//                     name: data.course_title,
//                     price: data.course_price,
//                   },
//                 },
//               })
//             }
//             className="px-4 py-1.5 text-xs font-semibold rounded-full 
//             bg-gradient-to-r from-purple-600 to-indigo-600 
//             hover:from-purple-700 hover:to-indigo-700 
//             text-white shadow-md hover:shadow-lg 
//             transition-all duration-300"
//           >
//             Enroll
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
//       <div className="ml-20 md:ml-24 p-10 w-full">

//         <h1 className="text-3xl font-bold mb-6">All Courses</h1>

//         {/* All Courses */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredCourses.map((data) => (
//             <CourseCard key={data.course_id} data={data} />
//           ))}
//         </div>

//         {/* Grow */}
//         <h2 className="text-2xl font-bold mt-20 mb-6">
//           Grow in your roles
//         </h2>
//         <div className="grid grid-cols-4 gap-6">
//           {coursedata.slice(0, 4).map((data) => (
//             <CourseCard key={data.course_id} data={data} />
//           ))}
//         </div>

//         {/* Currently Watching */}
//         <h2 className="text-2xl font-bold mt-20 mb-6">
//           Currently Watching
//         </h2>
//         <div className="grid grid-cols-4 gap-6">
//           {currentlyWatching.length > 0 ? (
//             currentlyWatching.map((data) => (
//               <CourseCard key={data.course_id} data={data} />
//             ))
//           ) : (
//             <p>No courses watched yet</p>
//           )}
//         </div>

//         {/* Popular */}
//         <h2 className="text-2xl font-bold mt-20 mb-6">
//           Most Popular Certificates
//         </h2>
//         <div className="grid grid-cols-4 gap-6">
//           {coursedata.slice(5, 9).map((data) => (
//             <CourseCard key={data.course_id} data={data} />
//           ))}
//         </div>

//         {/* Personalized */}
//         <h2 className="text-2xl font-bold mt-20 mb-6">
//           Personalized Specializations For You
//         </h2>
//         <div className="grid grid-cols-4 gap-6 mb-20">
//           {coursedata.slice(3, 7).map((data) => (
//             <CourseCard key={data.course_id} data={data} />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AllCourses;


//  <div className="mt-20">
// //           <h2 className="text-2xl font-bold mb-4">Recently Viewed Products</h2>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {coursedata.slice(2, 7).map((data) => (
//               <div
//                 key={data.course_id}
//                 className="min-w-[210px] bg-white dark:bg-[#1b1b1b] rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer border dark:border-white/10"
//               >
//                 <img
//                   src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
//                   className="h-28 w-full object-cover rounded-lg"
//                 />
//                 <h3 className="font-semibold text-sm mt-2 text-gray-800 dark:text-gray-200">
//                   {data.course_title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../services/Api";
import {
  Code,
  Brain,
  Monitor,
  Briefcase,
  User,
  Palette,
  Megaphone,
} from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const menuItems = ["All", "Beginner", "Intermediate", "Advanced"];

const categories = [
  { name: "Development", icon: <Code size={22} /> },
  { name: "Artificial Intelligence & Data Science", icon: <Brain size={22} /> },
  { name: "IT & Software", icon: <Monitor size={22} /> },
  { name: "Business", icon: <Briefcase size={22} /> },
  { name: "Personal Development", icon: <User size={22} /> },
  { name: "Design", icon: <Palette size={22} /> },
  { name: "Marketing", icon: <Megaphone size={22} /> },
];

function AllCourses() {
  const [active, setActive] = useState(0);
  const [coursedata, setCourseData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentlyWatching, setCurrentlyWatching] = useState([]);

  const navigate = useNavigate();

  const fetchdata = async () => {
    const response = await Api.get("/course_display");
    setCourseData(response.data);
  };

  useEffect(() => {
    fetchdata();
    const watched = JSON.parse(localStorage.getItem("watching")) || [];
    setCurrentlyWatching(watched);
  }, []);

  const roleMap = [null, "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = Array.isArray(coursedata)
    ? coursedata.filter((course) => {
        const skillMatch =
          roleMap[active] === null || course.skill_level === roleMap[active];
        const categoryMatch =
          selectedCategory === "All" || course.category === selectedCategory;
        return skillMatch && categoryMatch;
      })
    : [];

  const handleWatch = (data) => {
    let watched = JSON.parse(localStorage.getItem("watching")) || [];

    if (!watched.find((item) => item.course_id === data.course_id)) {
      watched.unshift(data);
    }

    localStorage.setItem("watching", JSON.stringify(watched));
    setCurrentlyWatching(watched.slice(0, 8));
  };

  // ⭐ PREMIUM COURSE CARD
  const CourseCard = ({ data }) => (
    <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <Link
        to={`/coursedisplay/${data.course_id}`}
        onClick={() => handleWatch(data)}
      >
        <div className="w-full h-44 overflow-hidden">
          <img
            src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
            alt={data.course_title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-[15px] leading-snug text-gray-800 dark:text-gray-100 line-clamp-2">
          {data.course_title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const rating = data.rating || 0;

            if (rating >= star) {
              return <FaStar key={star} className="text-yellow-400 text-xs" />;
            } else if (rating >= star - 0.5) {
              return <FaStarHalfAlt key={star} className="text-yellow-400 text-xs" />;
            } else {
              return <FaRegStar key={star} className="text-gray-300 text-xs" />;
            }
          })}

          <span className="text-xs text-gray-500 ml-1">
            {(data.rating || 0).toFixed(1)} ({data.total_reviews || 0})
          </span>
        </div>

        {/* Category */}
        <div className="mt-2">
          <span className="text-[11px] px-2 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {data.category}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Level: {data.skill_level}
        </p>

        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
          {data.prerequisites}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-gray-900 dark:text-white">
            ₹{data.course_price || "Free"}
          </span>

          <button
            onClick={() =>
              navigate(`/coursepaymentinfo/${data.course_id}`, {
                state: {
                  course: {
                    id: data.course_id,
                    name: data.course_title,
                    price: data.course_price,
                  },
                },
              })
            }
            className="px-4 py-1.5 text-xs font-semibold rounded-full 
            bg-gradient-to-r from-purple-600 to-indigo-600 
            hover:from-purple-700 hover:to-indigo-700 
            text-white shadow-md hover:shadow-lg 
            transition-all duration-300"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="ml-20 md:ml-24 p-10 w-full">

        <h1 className="text-3xl font-bold mb-6">All Courses</h1>

        {/* 🔥 Tabs */}
        <div className="flex border-b mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition ${
                active === index
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* 🔥 Categories */}
        <div className="flex gap-10 bg-white dark:bg-[#1a1a1a] p-5 rounded-xl shadow-sm mb-10 items-center overflow-x-auto">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(item.name)}
              className={`flex flex-col items-center cursor-pointer transition ${
                selectedCategory === item.name
                  ? "text-purple-600 scale-110"
                  : "text-gray-500"
              } hover:text-purple-600`}
            >
              <div className="mb-2">{item.icon}</div>
              <p className="text-sm">{item.name}</p>
            </div>
          ))}
        </div>

        {/* All Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>

        {/* Grow */}
        <h2 className="text-2xl font-bold mt-20 mb-6">
          Grow in your roles
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {coursedata.slice(0, 4).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>

        {/* Currently Watching */}
        {/* <h2 className="text-2xl font-bold mt-20 mb-6">
          Currently Watching
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {currentlyWatching.length > 0 ? (
            currentlyWatching.map((data) => (
              <CourseCard key={data.course_id} data={data} />
            ))
          ) : (
            <p>No courses watched yet</p>
          )}
        </div> */}
 {/* Recently Viewed */}
<h2 className="text-2xl font-bold mt-20 mb-6">
  Recently Viewed Products
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {coursedata.slice(2, 7).map((data) => (
    <CourseCard key={data.course_id} data={data} />
  ))}
</div>
        {/* Popular */}
        <h2 className="text-2xl font-bold mt-20 mb-6">
          Most Popular Course 
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {coursedata.slice(5, 9).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
         <h2 className="text-2xl font-bold mt-20 mb-6">
          Most liked courses by learners with similar interests 
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {coursedata.slice(2, 4).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
         <h2 className="text-2xl font-bold mt-20 mb-6">
          Recommandation on your current course Title
        </h2>
        <div className="grid grid-cols-4 gap-6 mb-20">
          {coursedata.slice(3, 7).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
         <h2 className="text-2xl font-bold mt-20 mb-6">
          Recommandation on your language preference
        </h2>
        <div className="grid grid-cols-4 gap-6 mb-20">
          {coursedata.slice(3, 7).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>

        {/* Personalized */}
        <h2 className="text-2xl font-bold mt-20 mb-6">
          Personalized Specializations For You
        </h2>
        <div className="grid grid-cols-4 gap-6 mb-20">
          {coursedata.slice(3, 7).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
 {/* Personalized */}
        <h2 className="text-2xl font-bold mt-20 mb-6">
          Recommandation on your current skill level
        </h2>
        <div className="grid grid-cols-4 gap-6 mb-20">
          {coursedata.slice(3, 7).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
         {/* Personalized */}
        <h2 className="text-2xl font-bold mt-20 mb-6">
          Recommandation on your current intersts and performance
        </h2>
        <div className="grid grid-cols-4 gap-6 mb-20">
          {coursedata.slice(3, 7).map((data) => (
            <CourseCard key={data.course_id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;