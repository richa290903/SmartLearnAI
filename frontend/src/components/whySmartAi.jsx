// import { useState, useEffect } from "react";
import { BookOpen, Award, Clock, GraduationCap } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";

export default function WhySwayam() {
  const features = [
    {
      icon: BookOpen,
      title: "Free Course from Top Universities",
      desc: "Find free courses from the best universities",
      image: "/images/img4.jpeg",
    },
    {
      icon: Clock,
      title: "Self-Paced Learning",
      desc: "Learn at your own pace, anytime, anywhere",
      image: "/images/img3.jpeg",
    },
    {
      icon: Award,
      title: "Earn Certifications",
      desc: "Get certificates and recognition",
      image: "/images/img2.jpeg",
    },
    {
      icon: GraduationCap,
      title: "Get University Credits",
      desc: "Transfer credits to your degree",
      image: "/images/img1.jpeg",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,   // animation every time
      mirror: true,
    });
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-6 py-16 pl-20 bg-white dark:bg-gray-900">
      
      {/* TITLE */}
      <h2
        data-aos="fade-up"
        className="text-3xl font-bold mb-10 text-black dark:text-white"
      >
        Why <span className="text-blue-600 dark:text-blue-400">SmartLearn.AI ?</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT BLOCKS */}
        <div className="space-y-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                data-aos="fade-right"
                data-aos-delay={index * 100}
                onClick={() => setActive(index)}
                className={`group cursor-pointer flex items-start gap-4 p-5 border rounded-xl
                transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
                ${active === index
                  ? "border-blue-600 dark:border-blue-400 shadow-xl scale-[1.02]"
                  : "hover:-translate-y-2 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400"
                }`}
              >
                <div
                  className={`p-3 rounded-lg transition-all duration-300
                  ${
                    active === index
                      ? "bg-blue-600 text-white scale-110"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT IMAGE */}
        <div
          data-aos="fade-left"
          className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
        >
          <img
            src={features[active].image}
            alt="Feature"
            className="w-full h-[450px] object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}