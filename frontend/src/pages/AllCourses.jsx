import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState(0); // tab index
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const menuItems = ["All", "Beginner", "Intermediate", "Advanced"];
  const roleMap = [null, "Beginner", "Intermediate", "Advanced"];

  //  Find max reviews
  const maxReviews = Math.max(...courses.map(c => c.total_reviews || 0), 0);

  //  Bestseller = courses having max reviews
  const bestSellerIds = courses
  .filter(c => c.rating >= 4.5 && c.total_reviews > 100)
  .map(c => c.course_id);

  //  Fetch courses
  useEffect(() => {
    Api.get("/course_display")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  //  Unique categories
  const categories = ["All", ...new Set(courses.map(c => c.categories))];

  //  FINAL FILTER LOGIC (ONLY ONE PLACE)
  const filteredCourses = courses.filter((course) => {

    //  Search
    const matchesSearch =
      course.course_title?.toLowerCase().includes(search.toLowerCase());

    //  Skill (Tabs)
    const matchesSkill =
      roleMap[active] === null || course.skill_level === roleMap[active];

    //  Category
    const matchesCategory =
      selectedCategory === "All" || course.categories === selectedCategory;

    return matchesSearch && matchesSkill && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">

      {/*  SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/*  TABS (Skill Level) */}
      <div className="flex border-b mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`px-6 py-3 text-sm font-medium transition ${
              active === index
                ? "border-b-2 border-purple-600 text-purple-700"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/*  COURSES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredCourses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          filteredCourses.map((data) => (
            <Link
            to={`/coursedisplay/${data.course_id}`}
            key={data.course_id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden flex flex-col"
          >

            {/* Thumbnail */}
            <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
              <img
                src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {/* Badge */}
{data.price === 0 ? (
  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
    Free
  </span>
) : bestSellerIds.includes(data.course_id) ? (
  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
    Bestseller
  </span>
) : null}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">

              {/* Title */}
              <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {data.course_title}
              </h2>

              {/* Description */}
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                {data.description}
              </p>

              {/* Skill + Category */}
              <div className="text-xs text-gray-600 mt-2 flex justify-between">
                <span>{data.skill_level}</span>
                <span>{data.categories}</span>
              </div>

              {/* ⭐ Rating */}
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const rating = data.rating || 0;

                  if (rating >= star) {
                    return <FaStar key={star} className="text-yellow-500 text-sm" />;
                  } else if (rating >= star - 0.5) {
                    return <FaStarHalfAlt key={star} className="text-yellow-500 text-sm" />;
                  } else {
                    return <FaRegStar key={star} className="text-gray-300 text-sm" />;
                  }
                })}

                <span className="text-sm font-semibold ml-1">
                  {data.rating ? data.rating.toFixed(1) : "0.0"}
                </span>
              </div>

              {/* Price + Button */}
              <div className="mt-auto pt-4 flex items-center justify-between">

                {/* Price */}
                <div>
                  {data.price === 0 ? (
                    <span className="text-green-600 font-bold text-sm">Free</span>
                  ) : (
                    <>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{data.course_price}
                      </span>
                      {data.course_price && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ₹{data.course_price}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Buy Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // stop Link navigation
                    alert("Proceed to buy course " + data.course_id);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-2 rounded-lg transition"
                >
                  Buy Now
                </button>

              </div>

            </div>
          </Link>
          ))
        )}

      </div>
    </div>
  );
}

export default AllCourses;