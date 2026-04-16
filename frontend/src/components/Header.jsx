import { useEffect, useState , useRef} from "react";
import {Contact, Search} from "lucide-react"
import Api from "../services/Api";
import { Link ,useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";

function Header(){
      const [open, setOpen] = useState(false);
      const [openc, setOpenc] = useState(false);
      const [userId, setUserId] = useState(null);
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      const dropdownRef = useRef(null);
      
     useEffect(() => {
                  const fetchUser = async () => {
                  try {
                        const res = await Api.get("/me", {
                        withCredentials: true // IMPORTANT
                        });

                        setUser(res.data); // user exists
                  } catch (err) {
                        setUser(null); // not logged in
                  } finally {
                        setLoading(false);
                  }
                  };

                  fetchUser();
                  }, []);

      useEffect(() => {
            const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                  setOpen(false); // close dropdown
            }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
            }, []);

    const handleLogout = async () => {
            try {
            //  Call backend to clear cookie
            await Api.post("/logout", {}, { withCredentials: true });

            } catch (err) {
            console.log(err);
            }

            //  Clear frontend
            localStorage.removeItem("token"); // optional
            setUser(null);

            navigate("/"); //  goes to landing
            };

      return (
      <div>
            <header className="bg-white">
            <nav aria-label="Global" className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white">
            <div className="flex items-center gap-6">
                  <a href="#" className="">
                  <span className="text-2xl text-blue-700" >SmartLearn.AI</span>
                  </a>
            </div>

            <div className="flex items-left rounded-full shadow border px-30 py-2 hidden md:flex">
                  <Search className="text-gray-500" />
                  <input type="text" placeholder="Search for anything"
                  className="ml-2 w-full outline-none text-sm"/>
            </div>
      
            <div className="flex lg:hidden">
                  <button type="button" command="show-modal" commandfor="mobile-menu" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                  <span className="sr-only">Open main menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  </button>
            </div>
            <el-popover-group className="hidden lg:flex lg:gap-x-12">
                  <div className="relative">
                  </div>
            <Link to="/" className="text-sm/6 font-semibold text-gray-900">Home</Link>
            <Link to="/about" className="text-sm/6 font-semibold text-gray-900">About</Link>
            <Link to="/blog" className="text-sm/6 font-semibold text-gray-900">Blog</Link>
            <Link to="/allcourses" className="text-sm/6 font-semibold text-gray-900">All Courses</Link>
            <Link to="/contact" className="text-sm/6 font-semibold text-gray-900">Contact</Link>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
            </a>

            </el-popover-group>
             {/* <div className="relative"> */}
                  {/* Profile Button */}
                  {/* <button onClick={() => setOpen(!open)}>
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                  />
                  </svg>
                  </button>



            {open && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50 overflow-hidden animate-fadeIn"> */}
                  
                  {/* USER INFO */}
                  {/* {user && (
                        <div className="px-4 py-3 border-b bg-gray-50">
                        <p className="text-sm font-semibold text-gray-800">
                        {user?.fullname}
                        </p>
                        <p className="text-xs text-gray-500">Welcome back 👋</p>
                        </div>
                  )}

                  <ul className="py-2 text-sm text-gray-700"> */}

                        {/*  IF USER LOGGED IN */}
                        {/* {!loading && user ? (
                        <>
                        <li>
                              <Link
                              to={`/exampleprofile`}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                              >
                              Profile
                              </Link>
                        </li>

                        <li>
                              <a
                              href="http://localhost:5174/dashboard"
                              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                              >
                              Instructor
                              </a>
                        </li>

                        <li
                              onClick={handleLogout}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer transition"
                        >
                              Logout
                        </li>
                        </>
                        ) : (
                        <> */}
                        {/*  NOT LOGGED IN */}
                        {/* <li>
                              <Link
                              to="/login"
                              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                              >
                              Login
                              </Link>
                        </li>

                        <li>
                              <Link
                              to="/registration"
                              className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 hover:text-green-600 transition"
                              >
                              Registration
                              </Link>
                        </li>
                        </>
                        )}
                  </ul>
                  </div>
                  )}


            </div> */}

            <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button onClick={() => setOpen(!open)}>
            <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                  />
            </svg>
            </button>

            {/* Dropdown */}
            {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50 overflow-hidden animate-fadeIn">
                  
                  {user && (
                  <div className="px-4 py-3 border-b bg-gray-50">
                  <p className="text-sm font-semibold text-gray-800">
                        {user?.fullname}
                  </p>
                  <p className="text-xs text-gray-500">Welcome Back </p>
                  </div>
                  )}

                  <ul className="py-2 text-sm text-gray-700">
                  {!loading && user ? (
                  <>
                        <li>
                        <Link
                        to="/exampleprofile"
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                        Profile
                        </Link>
                        </li>

                        <li>
                              <button
                              onClick={async () => {
                                    try {
                                    // Step 1: get logged user id
                                    const userRes = await Api.get("/me", {
                                    withCredentials: true,
                                    });

                                    const userId = userRes.data.user_id;

                                    // Step 2: check instructor profile
                                    const res = await Api.get(
                                    `/get_instructor_by_user/${userId}`,
                                    { withCredentials: true }
                                    );

                                    if (res.data.exists) {
                                    // ✅ Profile exists → open dashboard (other project)
                                    window.location.href = "http://localhost:5174/dashboard";
                                    } else {
                                    //  Profile not created → open setup page
                                    window.location.href = "http://localhost:5174/profilesetup";
                                    }

                                    } catch (err) {
                                    console.log(err);
                                    alert("Error checking instructor profile");
                                    }
                              }}
                              className="flex w-full text-left items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                              >
                              Instructor
                        </button>
                        </li>

                        <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        >
                        Logout
                        </li>
                  </>
                  ) : (
                  <>
                        <li>
                        <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                        Login
                        </Link>
                        </li>

                        <li>
                        <Link
                        to="/registration"
                        className="block px-4 py-2 hover:bg-green-50 hover:text-green-600"
                        >
                        Registration
                        </Link>
                        </li>
                  </>
                  )}
                  </ul>
            </div>
            )}
            </div>










            </nav>

             <li className="px-4 py-2 text-gray-500">
                  Hello, {user?.fullname}
                  </li>
          
         
       <el-dialog>
      <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                  <div tabIndex="0" className="fixed inset-0 focus:outline-none">
                  <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                        <span className="text-blue-600 text-2xl" >SmartLearn.AI</span>
                        </a>
                        <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Close menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </button>
                  </div>
                  <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        <div className="-mx-3">
                              <button type="button" command="--toggle" commandfor="products" className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                              Product
                              <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 flex-none in-aria-expanded:rotate-180">
                              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                              </svg>
                              </button>
                  <el-disclosure id="products" hidden className="mt-2 block space-y-2">
                  <li
                        className="relative list-none"
                        onMouseEnter={() => setOpenc(true)}
                  >
                  {/* Explore Button */}
                        <button onClick={() => setOpenc(prev => !prev)}
                              className="flex items-center justify-between w-full py-2 px-3 rounded font-medium text-heading md:w-auto hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"> Explore
                              <svg className="w-4 h-4 ms-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                              </svg>
                              </button>
                  {/* Mega Dropdown */}
                        {openc && (
  
                   <div
                        className="absolute left-0 mt-5 w-[900px] bg-white shadow-xl rounded-xl p-6 border border-gray-200 animate-dropdown z-30"
                  onMouseEnter={() => setOpenc(true)}   
                  onMouseLeave={() => setOpenc(false)}  
                  >
            <div className="grid grid-cols-4 gap-8">
                   {/* Column 1 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Explore roles</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Data Analyst</li>
                        <li>Project Manager</li>
                        <li>Cyber Security Analyst</li>
                        <li>Data Scientist</li>
                        <li>Business Intelligence Analyst</li>
                        <li>UI/UX Designer</li>
                        <li>Machine Learning Engineer</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Explore categories</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Artificial Intelligence</li>
                        <li>Business</li>
                        <li>Data Science</li>
                        <li>IT & Software</li>
                        <li>Healthcare</li>
                        <li>Personal Development</li>
                        <li>Arts & Humanities</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Certificates</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Business</li>
                        <li>Data Science</li>
                        <li>Computer Science</li>
                        <li>Marketing</li>
                        <li>Information Technology</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 4 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trending Skills</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Python</li>
                        <li>Artificial Intelligence</li>
                        <li>Machine Learning</li>
                              <li>SQL</li>
                              <li>Power BI</li>
                              <li>Marketing</li>
                              <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                        </ul>
                        </div>

                        </div>
                  </div>
            )}
                         </li>
                         </el-disclosure>
                        </div>
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div className="py-6">
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
                        </div>
                        </div>
                  </div>
                  </el-dialog-panel>
                  </div>
            </dialog>
            </el-dialog>


      </header>
      </div>            
)}
export default Header;



