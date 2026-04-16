import { useRef, useEffect, useState } from "react";
import Api from "../services/Api";
import { Link } from "react-router-dom";

export default function CourseSlider() {

  const [videos, setVideos] = useState([]);
  const scrollRef = useRef(null);

  // Fetch courses
  useEffect(() => {
    Api.get("/course_display")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loopData = [...videos, ...videos];

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;

        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth / 2
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [videos]);

  return (
    <div className="w-full bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Trending Courses
      </h2>

      <div ref={scrollRef} className="flex gap-6 overflow-x-hidden">

        {loopData.map((item, i) => (
          <Link
                to={`/coursedisplay/${item.course_id}`}
                // key={index}
          //       key={item.course_id}
          //       className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
              >
          <div key={i} className="min-w-[280px] bg-white rounded-xl shadow-lg overflow-hidden">

            <div className="relative">
              <img
                src={"http://localhost:8000/Thumbnail/"+item.thumbnail}
                alt={item.course_title}
                className="w-full h-40 object-cover"
              />

              <span className="absolute top-2 left-2 bg-yellow-500 text-xs px-2 py-1 rounded font-bold">
                {item.category}
              </span>
            </div>

            <div className="p-3">
              <h3 className="font-semibold">{item.course_title}</h3>

              <p className="text-sm text-gray-600">
                {item.desc}
              </p>

              <div className="flex justify-between mt-2 text-sm">
                <span>{item.skill_level}</span>
                <span className="text-gray-500">{item.author}</span>
              </div>

              <p className="text-xs text-gray-500">
                {item.prerequisites}
              </p>
            </div>

          </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
