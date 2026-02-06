import { useState } from "react";
import SideBar from "./SideBar";
const courses = [
  {
    id: 1,
    title: "The Complete Full-Stack Web Development Bootcamp",
    author: "Dr. Angela Yu",
    rating: 4.7,
    students: "463,310",
    price: "₹479",
    oldPrice: "₹3,199",
    image:
      "https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg",
    tags: ["Premium", "Bestseller"],
  },
  {
    id: 2,
    title: "The Complete JavaScript Course 2025: From Zero to Expert!",
    author: "Jonas Schmedtmann",
    rating: 4.7,
    students: "230,613",
    price: "₹539",
    oldPrice: "₹3,459",
    image:
      "https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg",
    tags: ["Premium", "Bestseller"],
  },
  {
    id: 3,
    title: "Angular - The Complete Guide",
    author: "Maximilian Schwarzmüller",
    rating: 4.7,
    students: "221,601",
    price: "₹479",
    oldPrice: "₹3,109",
    image:
      "https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg",
    tags: ["Premium", "Bestseller"],
  },
  {
    id: 4,
    title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
    author: "Jonas Schmedtmann",
    rating: 4.7,
    students: "25,053",
    price: "₹479",
    oldPrice: "₹799",
    image:
      "https://img-c.udemycdn.com/course/240x135/2365628_0b60_12.jpg",
    tags: ["Premium", "Bestseller"],
  },
];
const menuItems = [
  "Instructors",
  "Learners",
  "Employees",
];
const CourseCard = ({ course }) => (
  <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
    <img src={course.image} alt={course.title} className="w-full h-40 object-cover"></img>
      <h3 className="font-semibold text-gray-800 text-sm">{course.title}</h3>
      <span className="font-bold text-yellow-600">{course.rating} ⭐</span>
    <div className="p-4 space-y-2">
      <p className="text-gray-500 text-xs">{course.author}</p>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">({course.students})</span>
      </div>

      <div className="flex items-center gap-2 font-semibold text-gray-900">
        <span>{course.price}</span>
        <span className="line-through text-gray-400 text-xs">{course.oldPrice}</span>
      </div>

      <div className="flex gap-2">
        {course.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);
function Course() {
  const [active,setActive]=useState(0);
  return (
    <div className="flex bg-gradient-to-br from-white to-slate-100 min-h-screen">
      <SideBar />
      
      <div className="ml-20 md:ml-24 p-10 w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">My Uploaded Courses</h1>

        {/* <div className="flex-1 ml-16 overflow-y-auto bg-gray-50 p-10 transition-all duration-300">
          <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-10"> */}
        
                {/* Page Header */}
                <h1 className="text-3xl font-bold">All Courses</h1>
            <div className="mx-auto ">
              {/* Top Menu */}
                <div className="flex border-b">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`px-6 py-3 text-sm font-medium transition
                          ${
                            active === index
                              ? "border-b-2 border-purple-600 text-purple-700"
                              : "text-gray-600 hover:text-black"
                          }`}>
                        {item}
                      </button>))}
                  </div>
                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
            </div>
        </div>
    </div>
  );
}export default Course;