import { useRef, useEffect } from "react";

const videos = [
  {
    id: 1,
    title: "React for Beginners",
    desc: "Learn React from scratch with real projects",
    rating: 4.7,
    author: "John Doe",
    channel: "Code Academy",
    tag: "Best Seller",
    src: "/videos/react.mp4",
  },
  {
    id: 2,
    title: "Tailwind Masterclass",
    desc: "Build modern UI using Tailwind CSS",
    rating: 4.5,
    author: "Sarah Khan",
    channel: "UI School",
    tag: "Premium",
    src: "/videos/tailwind.mp4",
  },
  {
    id: 3,
    title: "Node.js Complete Guide",
    desc: "Backend development with Node.js",
    rating: 4.8,
    author: "Alex Smith",
    channel: "Dev Hub",
    tag: "Best Seller",
    src: "/videos/node.mp4",
  },
];

const loopData = [...videos, ...videos];

export default function VideoScroll() {
  const scrollRef = useRef(null);

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
  }, []);

  return (
    <div className="w-full bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Trending Courses
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden hide-scroll"
      >
        {loopData.map((item, i) => (
          <div
            key={i}
            className="min-w-[280px] bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Video */}
            <div className="relative">
              <video
                src={item.src}
                muted
                loop
                autoPlay
                className="w-full h-40 object-cover"
              />

              {/* Tag */}
              <span className="absolute top-2 left-2 bg-yellow-500 text-xs px-2 py-1 rounded font-bold">
                {item.tag}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.desc}
              </p>

              <div className="flex justify-between items-center mt-2 text-sm">
                <span>⭐ {item.rating}</span>
                <span className="text-gray-500">
                  {item.author}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                {item.channel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Center arrows */}
      <div className="flex justify-center gap-4 mt-4 text-3xl">
        <span
          onClick={() => (scrollRef.current.scrollLeft -= 300)}
          className="cursor-pointer hover:scale-125"
        >
          ‹
        </span>
        <span
          onClick={() => (scrollRef.current.scrollLeft += 300)}
          className="cursor-pointer hover:scale-125"
        >
          ›
        </span>
      </div>
    </div>
  );
}
