// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Api from "../services/Api";
// import { useNavigate } from "react-router-dom";

// function Contact(){
//     // const { user_id } = useParams();
//     const [user, setUser] = useState(null);
//     const [message,setMessage] = useState("");
//     // const [formData, setFormData] = useState({
//     //     fullname: "",
//     //     email:""
//     // });
//      useEffect(() => {
//       Api.get("/me")
//         .then((res) => {
//           setUser(res.data);
//         })
//         .catch((err) => console.log(err));
//     }, []);


//    const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const user_id = localStorage.getItem("user_id");

//         // ✅ Check if user logged in
//         if (!user_id) {
//             alert("Please login first");
//             navigate("/login");   // redirect to login page
//             return;
//         }

//         try {
//             await Api.post("/insert_contact_msg", {
//                 user_id: user_id,
//                 message: message
//             });

//             alert("Message sent successfully");
//             setMessage("");

//         } catch (error) {
//             console.log(error);
//             alert("Message sending failed");
//         }
//     };

//     return (
//         <div className="bg-white dark:bg-gray-900 min-h-screen">
//             <section className="bg-white-100 dark:bg-gray-800" id="contact">
//                 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//                 <div className="mb-4">
//                     <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
//                         <h2
//                             className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
//                             Get in Touch
//                         </h2>
//                         <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300"> Want to contact us? Choose an
//                                 option below and well be happy to show you how we can transform company web experience.
//                         </p>
//                     </div>
//                 </div>
//                 <div class="flex items-stretch justify-center">
//                     <div class="grid md:grid-cols-2">
//                         <div class="h-full pr-6">
//                             <ul className="mb-3 mt-14">
//                                 <li className="flex">
//                                     <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//                                             strokeLinejoin="round" className="h-6 w-6">
//                                             <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
//                                             <path
//                                                 d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
//                                             </path>
//                                         </svg>
//                                     </div>
//                                     <div className="ml-4 mb-4">
//                                         <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
//                                         </h3>
//                                         <p className="text-gray-600 dark:text-gray-300">1230 Maecenas Street Donec Road</p>
//                                         <p className="text-gray-600 dark:text-gray-300">New York, EEUU</p>
//                                     </div>
//                                 </li>
//                                 <li className="flex">
//                                     <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//                                             strokeLinejoin="round" className="h-6 w-6">
//                                             <path
//                                                 d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
//                                             </path>
//                                             <path d="M15 7a2 2 0 0 1 2 2"></path>
//                                             <path d="M15 3a6 6 0 0 1 6 6"></path>
//                                         </svg>
//                                     </div>
//                                     <div className="ml-4 mb-4">
//                                         <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
//                                         </h3>
//                                         <p className="text-gray-600 dark:text-gray-300">Mobile: +91 1234567890</p>
//                                         <p className="text-gray-600 dark:text-gray-300">Mail: interactdesignhub<span>@</span>gmail.com</p>
//                                     </div>
//                                 </li>
//                                 <li className="flex">
//                                     <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//                                             strokeLinejoin="round" className="h-6 w-6">
//                                             <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
//                                             <path d="M12 7v5l3 3"></path>
//                                         </svg>
//                                     </div>
//                                     <div className="ml-4 mb-4">
//                                         <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working
//                                             hours</h3>
//                                         <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 08:00 - 17:00</p>
//                                         <p class="text-gray-600 dark:text-slate-900">Saturday &amp; Sunday: 08:00 - 12:00</p>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white dark:bg-gray-800 rounded-lg" id="form">
//                             <form onSubmit={handleSubmit}>
//                                 <div class="mb-6">
//                                     <div class="mx-0 mb-1 sm:mb-4">
//                                         <div class="mx-0 mb-1 sm:mb-4">
//                                             <label class="pb-1 text-xs uppercase tracking-wider" ></label>
//                                             <input type="text" autoComplete="off" placeholder="Your name" value={user?.fullname||""}  className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md bg-white dark:bg-gray-700 text-black dark:text-white sm:mb-0"/>
//                                         </div>
//                                         <div class="mx-0 mb-1 sm:mb-4">
//                                             <label class="pb-1 text-xs uppercase tracking-wider"></label>
//                                             <input type="email"  autoComplete="off"  placeholder="Your email address" value={user?.email||""} className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md bg-white dark:bg-gray-700 text-black dark:text-white sm:mb-0"/>
//                                         </div>
//                                     </div>
//                                     <div class="mx-0 mb-1 sm:mb-4">
//                                         <label class="pb-1 text-xs uppercase tracking-wider"></label>
//                                         <textarea  name="c_message" cols="30" rows="5" autoComplete="off" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md bg-white dark:bg-gray-700 text-black dark:text-white sm:mb-0" onChange={(e)=>setMessage(e.target.value)} required></textarea>
//                                     </div>
//                                 </div>
//                                 <div class="text-center">
//                                     <button type="submit" className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 hover:bg-blue-900" name="send_msg">Send Message</button>
//                                 </div>
//                             </form>
//                             <h3 className="text-black dark:text-white">{message}</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </section>
//         </div>
//    )}
//    export default Contact;


import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Contact(){
    const [user, setUser] = useState(null);
    const [message,setMessage] = useState("");

    useEffect(() => {
      Api.get("/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));

      // ✅ ONLY animation added
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
      });
    }, []);

   const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            await Api.post("/insert_contact_msg", {
                user_id: user_id,
                message: message
            });

            alert("Message sent successfully");
            setMessage("");

        } catch (error) {
            console.log(error);
            alert("Message sending failed");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <section className="bg-white-100 dark:bg-gray-800" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

                <div className="mb-4">
                    <div
                        data-aos="fade-up"
                        className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12"
                    >
                        <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                            Want to contact us? Choose an option below and well be happy to show you how we can transform company web experience.
                        </p>
                    </div>
                </div>

                <div class="flex items-stretch justify-center">
                    <div class="grid md:grid-cols-2">

                        {/* LEFT SIDE */}
                        <div data-aos="fade-right" class="h-full pr-6">
                            <ul className="mb-3 mt-14">

                                <li className="flex" data-aos="fade-right" data-aos-delay="100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        {/* ✅ YOUR ORIGINAL SVG ICON (UNCHANGED) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address</h3>
                                        <p className="text-gray-600 dark:text-gray-300">1230 Maecenas Street Donec Road</p>
                                        <p className="text-gray-600 dark:text-gray-300">New York, EEUU</p>
                                    </div>
                                </li>

                                <li className="flex" data-aos="fade-right" data-aos-delay="200">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        {/* ✅ YOUR ORIGINAL SVG ICON */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                            <path d="M15 7a2 2 0 0 1 2 2"></path>
                                            <path d="M15 3a6 6 0 0 1 6 6"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Mobile: +91 1234567890</p>
                                        <p className="text-gray-600 dark:text-gray-300">Mail: interactdesignhub@gmail.com</p>
                                    </div>
                                </li>

                                <li className="flex" data-aos="fade-right" data-aos-delay="300">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        {/* ✅ YOUR ORIGINAL SVG ICON */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                            <path d="M12 7v5l3 3"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working hours</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 08:00 - 17:00</p>
                                        <p className="text-gray-600 dark:text-gray-300">Saturday & Sunday: 08:00 - 12:00</p>
                                    </div>
                                </li>

                            </ul>
                        </div>

                        {/* FORM */}
                        <div data-aos="fade-left" className="card h-fit max-w-6xl p-5 md:p-12 bg-white dark:bg-gray-800 rounded-lg" id="form">
                            <form onSubmit={handleSubmit}>
                                <div class="mb-6">
                                    <div class="mx-0 mb-1 sm:mb-4">

                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <input type="text" value={user?.fullname||""} className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md"/>
                                        </div>

                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <input type="email" value={user?.email||""} className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md"/>
                                        </div>

                                    </div>

                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <textarea className="mb-2 w-full rounded-md border border-gray-400 dark:border-gray-600 py-2 pl-2 pr-4 shadow-md" onChange={(e)=>setMessage(e.target.value)} required></textarea>
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button type="submit" className="w-full bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900">
                                        Send Message
                                    </button>
                                </div>
                            </form>

                            <h3 className="text-black dark:text-white">{message}</h3>
                        </div>

                    </div>
                </div>

            </div>
            </section>
        </div>
   )
}

export default Contact;