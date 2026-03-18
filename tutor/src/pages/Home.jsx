import { Link } from "react-router-dom";
 function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl border border-gray-200 p-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SECTION */}
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              Become the instructor
            </span>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your potenial make  <br />GLobal impact</h1>

            <p className="mt-4 text-gray-600 text-lg">
             Build your brand by developing courses in new technologies
            </p>

            {/* EVENT DATE CARD */}
            <div className="mt-8 bg-green-100 p-5 rounded-xl w-fit shadow-sm">
              <p className="font-semibold text-gray-900">27 July</p>
              <p className="text-gray-700 text-sm mt-2">
                8 am PST • 11 am EST • 4 pm BST
              </p>
            </div>

            {/* LOGOS */}
            <div className="mt-10">
              <div className="flex gap-10 items-center opacity-80">
                <div class="flex items-center gap-6">
                  <a href="#" class="">
                  <span class="text-2xl text-blue-700" >SmartLearn.AI</span>
                  {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" /> */}
                  </a>
            </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - FORM */}
          <div>
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border shadow-md">

              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Start Your teaching Journey
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {/* Username */}
          <div className="mb-4">
              <label className="block text-sm mb-1">Fullname</label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full border rounded-md px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
      <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full border rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
              <input
                type="text"
                placeholder="What company do you work for?"
                className="border w-full rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="How did you hear about us?"
                className="border w-full rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-blue-400"
              />

              <p className="text-xs text-gray-500 mt-4">
                By submitting your details, you agree to our Terms
              </p>

              <button className="mt-5 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 w-full">
                Register Now
              </button>
              <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1 hover:underline">
              Login
            </Link>
          </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Home;