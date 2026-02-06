import React from "react";
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
  return (
    <div className="px-8 py-10">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">Web Development Courses</h1>

      <p className="text-gray-600 mt-2">
        Explore courses from experienced, real-world experts.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b pb-2">
        <button className="font-semibold border-b-2 border-black">Most Popular</button>
        <button className="text-gray-500 hover:text-black transition">Trending</button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}export default Course;