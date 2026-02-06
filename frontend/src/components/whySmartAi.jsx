import { useState } from "react";
import { BookOpen, Award, Clock, GraduationCap } from "lucide-react";

export default function WhySwayam() {
  const features = [
    {
      icon: BookOpen,
      title: "Free Course from Top Universities",
      desc: "Find free courses from the best universities",
      image:"/images/img4.jpeg",
    },
    {
      icon: Clock,
      title: "Self-Paced Learning",
      desc: "Learn at your own pace, anytime, anywhere",
      image:"/images/img3.jpeg",
    },
    {
      icon: Award,
      title: "Earn Certifications",
      desc: "Get certificates and recognition",
      image:"/images/img2.jpeg",
    },
    {
      icon: GraduationCap,
      title: "Get University Credits",
      desc: "Transfer credits to your degree",
      image:"/images/img1.jpeg",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="max-w-8xl mx-auto px-6 py-16 pl-20">
      <h2 className="text-3xl font-bold mb-10">
        Why <span className="text-blue-600">SmartLearn.AI ?</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT BLOCKS */}
        <div className="space-y-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`group cursor-pointer flex items-start gap-4 p-5 border rounded-xl
                        transition-all duration-300
                        ${active === item.image 
                        ? "border-blue-600 shadow-xl scale-[1.02]" 
                        : "hover:-translate-y-2 hover:shadow-xl hover:border-blue-500"
                }`}
              >
                <div
                  className={`p-3 rounded-lg transition
                  ${
                    active === index
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-800">
          <img
            src={features[active].image}
            alt="Feature"
            className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </div>
  );
}
