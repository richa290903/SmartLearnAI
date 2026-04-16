import { useEffect, useState } from "react";
import Api from "../services/Api";
import ImageSlider from "../components/ImageSlider";
import CourseSlider from "../components/CourseSlider";
import WhySmartAi from "../components/whySmartAi";
import About from "./About";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => alert("Unauthorized"));

    // Animation runs EVERY time
    AOS.init({
      duration: 1000,
      once: false,   //  important (animation every time)
      mirror: true,  //  re-animate on scroll up
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      {/* YOUR EXISTING COMPONENTS */}
      <ImageSlider />
      <WhySmartAi />
      <CourseSlider />
      <About />

      {/* HERO SECTION */}
      <section className="bg-white dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Learn Anything With <span className="text-blue-600">AI-Powered</span> Smart Courses.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              Boost your skills with expert-crafted courses and intelligent learning tools.
            </p>

            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition hover:scale-105">
              Explore Courses
            </button>
          </div>

          <img
            data-aos="fade-left"
            src="/images/aiimage.png"
            alt="Hero Illustration"
            className="w-full"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-14 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Browse Top Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Development",
              "Design",
              "Marketing",
              "AI & Machine Learning",
              "Business",
              "Data Science",
              "Cyber Security",
              "Photography",
            ].map((item, i) => (
              <div
                key={item}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg 
                text-center font-semibold text-gray-700 dark:text-gray-200 cursor-pointer 
                transition transform hover:-translate-y-1 hover:scale-105"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            What Students Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[ 
              { text: "Amazing learning experience!", name: "Rahul" },
              { text: "SmartLearn got me my first job.", name: "Priya" },
              { text: "Best platform for AI courses.", name: "Aman" }
            ].map((t, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 200}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:scale-105 transition"
              >
                <p className="text-gray-600 dark:text-gray-300">"{t.text}"</p>
                <h4 className="mt-4 font-semibold">— {t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* STATS SECTION */}
<section className="py-16 bg-gray-100 dark:bg-gray-800">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">

    {[
      { num: "10K+", label: "Students" },
      { num: "50+", label: "Courses" },
      { num: "1M+", label: "Minutes Watched" },
      { num: "4.8★", label: "Ratings" },
    ].map((item, i) => (
      <div
        key={i}
        data-aos="fade-up"
        data-aos-delay={i * 150}
        className="hover:scale-105 transition"
      >
        <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {item.num}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{item.label}</p>
      </div>
    ))}

  </div>
</section>

{/*  TRUSTED COMPANIES */}
<section className="py-16 bg-white dark:bg-gray-900">
  <h2
    data-aos="fade-up"
    className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
  >
    Trusted By Leading Companies
  </h2>

    <div className="overflow-hidden">
      <div className="flex items-center gap-16 animate-slide">
        {[
          "/images/ibm.png",
          "/images/aws.png",
          "/images/facebook.png",
          "/images/microsoft.jpg",
          "/images/google.png",
          "/images/nvidia.png",
          "/images/tcs.png",
          "/images/tech_mahindra.png",
          "/images/upi11.png",
        ].map((logo, i) => (
          <img
            key={i}
          data-aos="zoom-in"
          data-aos-delay={i% logo.length * 100}
          src={logo}
          className=" h-20 opacity-70 hover:opacity-100 hover:scale-110 transition dark:opacity-50"
          alt="company"
        />
      ))}
    </div>
  </div>

  <style>
    {`
      @keyframes slide {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-slide {
        display: flex;
        width: max-content;
        animation: slide 18s linear infinite;
      }
    `}
  </style>
</section>


{/* ------------------------------------------------------------ */}
{/* ⭐ FAQ SECTION */}
{/* ------------------------------------------------------------ */}
<section className="py-16 max-w-4xl mx-auto px-6">
  <h2
    data-aos="fade-up"
    className="text-3xl font-bold text-center mb-10 dark:text-white"
  >
    Frequently Asked Questions
  </h2>

  {[
    {
      q: "Do I get lifetime access?",
      a: "Yes, once purchased you can access the course anytime."
    },
    {
      q: "Can beginners learn here?",
      a: "Absolutely! Courses are beginner to advanced."
    }
  ].map((faq, i) => (
    <details
      key={i}
      data-aos="fade-up"
      data-aos-delay={i * 150}
      className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-[1.02] transition"
    >
      <summary className="cursor-pointer font-semibold dark:text-white">
        {faq.q}
      </summary>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.a}</p>
    </details>
  ))}
</section>
      {/* NEWSLETTER */}
      <section className="py-16 bg-blue-600 text-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold">Stay Updated!</h2>
        <p className="mt-2 text-lg">Get AI alerts and new course notifications.</p>

        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-full text-black outline-none w-64"
          />
          <button className="px-6 py-2 bg-black text-white rounded-r-full hover:scale-105 transition">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;