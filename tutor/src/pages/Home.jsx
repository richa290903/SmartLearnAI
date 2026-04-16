import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-10 transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gradient-to-br from-slate-950 to-slate-900"
        : "bg-gradient-to-br from-white to-gray-100"
    }`}>
      <div className={`w-full max-w-7xl shadow-xl rounded-2xl border p-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 border-slate-700 text-slate-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SECTION */}
          <div>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
              theme === "dark"
                ? "bg-blue-900/50 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}>
              Become the instructor
            </span>

            <h1 className={`mt-5 text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${
              theme === "dark" ? "text-slate-100" : "text-gray-900"
            }`}>
              Discover Your potenial make  <br />GLobal impact</h1>

            <p className={`mt-4 text-lg transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}>
             Build your brand by developing courses in new technologies
            </p>

            {/* EVENT DATE CARD */}
            <div className={`mt-8 p-5 rounded-xl w-fit shadow-sm transition-colors duration-300 ${
              theme === "dark"
                ? "bg-green-900/50 text-green-300"
                : "bg-green-100 text-gray-900"
            }`}>
              <p className="font-semibold">27 July</p>
              <p className={`text-sm mt-2 transition-colors duration-300 ${
                theme === "dark" ? "text-green-400" : "text-gray-700"
              }`}>
                8 am PST • 11 am EST • 4 pm BST
              </p>
            </div>

            {/* LOGOS */}
            <div className="mt-10">
              <div className="flex gap-10 items-center opacity-80">
                <div className="flex items-center gap-6">
                  <a href="#" className="">
                  <span className={`text-2xl transition-colors duration-300 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-700"
                  }`}>SmartLearn.AI</span>
                  {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" /> */}
                  </a>
            </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - FORM */}
          <div>
            <div className={`p-8 rounded-2xl border shadow-md transition-colors duration-300 ${
              theme === "dark"
                ? "bg-slate-800/80 backdrop-blur-lg border-slate-700"
                : "bg-white/80 backdrop-blur-lg border-gray-200"
            }`}>

              <h2 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                theme === "dark" ? "text-slate-100" : "text-gray-900"
              }`}>
                Start Your teaching Journey
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className={`border rounded-lg px-4 py-2 focus:ring-2 transition-colors duration-300 ${
                    theme === "dark"
                      ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400 placeholder-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`border rounded-lg px-4 py-2 focus:ring-2 transition-colors duration-300 ${
                    theme === "dark"
                      ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400 placeholder-gray-500"
                  }`}
                />
              </div>
              {/* Username */}
          <div className="mb-4">
              <label className={`block text-sm mb-1 transition-colors duration-300 ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}>Fullname</label>
              <input
                type="text"
                placeholder="Enter username"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-500"
                }`}
              />
          </div>
      <div className="mb-4">
            <label className={`block text-sm mb-1 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-500"
              }`}
            />
          </div>
              <input
                type="text"
                placeholder="What company do you work for?"
                className={`border w-full rounded-lg px-4 py-2 mt-4 focus:ring-2 transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400 placeholder-gray-500"
                }`}
              />

              <input
                type="text"
                placeholder="How did you hear about us?"
                className={`border w-full rounded-lg px-4 py-2 mt-4 focus:ring-2 transition-colors duration-300 ${
                  theme === "dark"
                    ? "border-slate-600 bg-slate-700 text-slate-100 focus:ring-blue-500 placeholder-slate-400"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400 placeholder-gray-500"
                }`}
              />

              <p className={`text-xs mt-4 transition-colors duration-300 ${
                theme === "dark" ? "text-slate-500" : "text-gray-500"
              }`}>
                By submitting your details, you agree to our Terms
              </p>

              <button className="mt-5 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 w-full transition-colors duration-300">
                Register Now
              </button>
              <p className={`text-sm text-center mt-4 transition-colors duration-300 ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}>
            Already have an account?
            <Link to="/login" className={`ml-1 hover:underline transition-colors duration-300 ${
              theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
            }`}>
          </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Home;