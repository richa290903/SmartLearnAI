import { useState } from "react";
// import Course from "./Course";
import {Contact, Search} from "lucide-react"
import { Link } from "react-router-dom";
function Header(){
      const [open, setOpen] = useState(false);
      const [openc, setOpenc] = useState(false);
      return (
      <div>
            <header class="bg-white">
            <nav aria-label="Global" class="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white">
            {/* <nav className="w-full flex items-center justify-between py-4px-6  shadow-sm bg-white"> */}
            <div class="flex items-center gap-6">
                  <a href="#" class="">
                  <span class="text-2xl text-blue-700" >SmartLearn.AI</span>
                  {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" /> */}
                  </a>
            </div>
                        <li
                  className="relative list-none"
                  onMouseEnter={() => setOpenc(true)}
                  // onMouseLeave={() => setOpenc(false)}
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
            className="absolute left-0 mt-5 w-[1100px] bg-white shadow-xl rounded-xl p-6 border border-gray-200 animate-dropdown z-30"
            onMouseEnter={() => setOpenc(true)}   // ⬅ KEEP OPEN when mouse enters grid
            onMouseLeave={() => setOpenc(false)}  // ⬅ CLOSE ONLY when mouse leaves entire panel
            >
            <div className="grid grid-cols-6 gap-8">
        {/* Column 1 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Artificial Intelligence & Data Science</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Machine Learning</li>
                        <li>Deep Learning</li>
                        <li>Data Analysis</li>
                        <li>Computer Vision</li>
                        <li>NLP</li>
                        <li>Generative AI</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">IT & Software</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Cybersecurity</li>
                        <li>Operating Systems</li>
                        <li>Linux</li>
                        <li>Ethical Hacking</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Entrepreneurship</li>
                        <li>Management</li>
                        <li>Finance</li>
                        <li>Marketing</li>
                        <li>Business Strategy</li>
                        <li>Sales</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 4 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Development</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Productivity</li>
                        <li>Leadership</li>
                        <li>Mental Wellness</li>
                        <li>Time Management</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                  {/* Column 5 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Graphic Design</li>
                        <li>UI/UX Design</li>
                        <li>Animation</li>
                        <li>3D Design</li>
                        <li>Illustration</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                        </ul>
                   </div>

                  {/* Column 6 */}
                  <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Marketing</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                        <li>Digital Marketing</li>
                        <li>SEO</li>
                        <li>Social Media</li>
                        <li>Email Marketing</li>
                        <li>Branding</li>
                        <li>Entrepreneurship</li>
                        <li>Management</li>
                        <li>Finance</li>
                        <li>Business Strategy</li>
                        <li>Marketing</li>
                        <li>Sales</li>
                        <li className="text-blue-600 font-medium cursor-pointer">View all</li>
                  </ul>
                  </div>

                        </div>
                  </div>
            )}
      </li>


            {/* Search bar */}
            {/* <div className="items-center riunded-full rounded-xl shadow border px-30 py-2 hidden md:flex">
                  <Search className="text-grey-500"></Search>
                  <input type="text" placeholder="Search for anything" className="ml-2 w-full outline-none text-sm"></input>
            </div> */}
            <div className="flex items-left rounded-full shadow border px-30 py-2 hidden md:flex">
                  <Search className="text-gray-500" />
                  <input type="text" placeholder="Search for anything"
                  className="ml-2 w-full outline-none text-sm"/>
            </div>
      
            <div class="flex lg:hidden">
                  <button type="button" command="show-modal" commandfor="mobile-menu" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                  <span class="sr-only">Open main menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  </button>
            </div>
            <el-popover-group class="hidden lg:flex lg:gap-x-12">
                  <div class="relative">
                  </div>
            <Link to="/" class="text-sm/6 font-semibold text-gray-900">Home</Link>
            <Link to="/about" class="text-sm/6 font-semibold text-gray-900">About</Link>
            <Link to="/blog" class="text-sm/6 font-semibold text-gray-900">Blog</Link>
            <Link to="/contact" class="text-sm/6 font-semibold text-gray-900">Contact</Link>
            <a href="#" class="text-sm/6 font-semibold text-gray-900">
                  {/* <Link to="/Course" element={<Course/>} className="flex items-center gap-2">Course</Link> */}
            </a>
            <a href="#" class="text-sm/6 font-semibold text-gray-900">
                  {/* <Link to="/Contact" element={<Contact/>} className="flex items-center gap-2">Contact</Link> */}
            </a>

                  {/* <a href="#" class="text-sm/6 font-semibold text-gray-900">Company</a> */}
            </el-popover-group>
             <div className="relative">
                  {/* Profile Button */}
                  <button onClick={() => setOpen(!open)}>
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                  />
                  </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                  <ul>
                        <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
                              <Link to="/Profile" className="flex items-center gap-2">                
                              <svg class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg> Profile</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-200">
                        <Link to="/registration" className="flex items-center gap-2">
                              <svg class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg> Registration
                        </Link>
                        </li>
                        <hr />
                        <li className="px-4 py-2 hover:bg-gray-200">
                        <Link to="/login" className="flex items-center gap-2">
                        {/* <Link to="/login" element={<Login/>} className="flex items-center gap-2"> */}
                                    <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                    <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                                    </svg>
                                    Login
                              </Link>
                        </li>
                  </ul>
                  </div>
                  )}
            </div>
            </nav>
          
          
                        <el-dialog>
      <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
                  <div tabindex="0" class="fixed inset-0 focus:outline-none">
                  <el-dialog-panel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                        <span class="text-blue-600 text-2xl" >SmartLearn.AI</span>
                        {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" /> */}
                        </a>
                        <button type="button" command="close" commandfor="mobile-menu" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Close menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
                        <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </button>
                  </div>
                  <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                        <div class="-mx-3">
                              <button type="button" command="--toggle" commandfor="products" class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                              Product
                              <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 flex-none in-aria-expanded:rotate-180">
                              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                              </svg>
                              </button>
                  <el-disclosure id="products" hidden class="mt-2 block space-y-2">
                  <li
                        className="relative list-none"
                        onMouseEnter={() => setOpenc(true)}
                  // onMouseLeave={() => setOpenc(false)}
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
                  onMouseEnter={() => setOpenc(true)}   // ⬅ KEEP OPEN when mouse enters grid
                  onMouseLeave={() => setOpenc(false)}  // ⬅ CLOSE ONLY when mouse leaves entire panel
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
                        <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                        <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                        <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
                        </div>
                        <div class="py-6">
                        <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
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