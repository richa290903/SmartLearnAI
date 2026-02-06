// import SideBar from "./SideBar";
// import { useState } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// function SettingPage() {
//   const [active,setActive]=useState(0);
//   const menuItems = [
//   "Instructors",
//   "Learners",
//   "Employees",
// ];
//   return (
//     <div className="flex bg-gray-100 max-h-screen ml-100 animate-fadeIn">
//         <SideBar></SideBar>
//       <div className="mx-auto ">
//       <div className="flex border-b">
//                     {menuItems.map((item, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setActive(index)}
//                         className={`px-6 py-3 text-sm font-medium transition
//                           ${
//                             active === index
//                               ? "border-b-2 border-purple-600 text-purple-700"
//                               : "text-gray-600 hover:text-black"
//                           }`}>
//                         {item}
//                       </button>))}
//                   </div>
//       {/* MAIN CONTENT */}
//       <div className="flex-1 p-10 animate-fadeIn full-screen">
//         <h1 className="text-3xl font-semibold mb-8">Profile & Settings</h1>

//         {/* CARD */}
//         <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">

//           {/* GRID FORM */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* FIRST NAME */}
//             <div>
//               <label className="text-gray-600 font-medium">First Name</label>
//               <input
//                 type="text"
//                 placeholder="Nisha"
//                 className="input-box"
//               />
//             </div>

//             {/* WEBSITE */}
//             <div>
//               <label className="text-gray-600 font-medium">Website</label>
//               <input
//                 type="text"
//                 placeholder="URL"
//                 className="input-box"
//               />
//             </div>

//             {/* LAST NAME */}
//             <div>
//               <label className="text-gray-600 font-medium">Last Name</label>
//               <input
//                 type="text"
//                 placeholder="Yadav"
//                 className="input-box"
//               />
//             </div>

//             {/* FACEBOOK */}
//             <div>
//               <label className="text-gray-600 font-medium">Facebook</label>
//               <input
//                 type="text"
//                 placeholder="facebook.com/username"
//                 className="input-box"
//               />
//             </div>

//             {/* HEADLINE */}
//             <div>
//               <label className="text-gray-600 font-medium">Headline</label>
//               <input
//                 type="text"
//                 maxLength="60"
//                 placeholder="Instructor at Udemy"
//                 className="input-box"
//               />
//             </div>

//             {/* INSTAGRAM */}
//             <div>
//               <label className="text-gray-600 font-medium">Instagram</label>
//               <input
//                 type="text"
//                 placeholder="instagram.com/username"
//                 className="input-box"
//               />
//             </div>

//           </div>

//           {/* BIOGRAPHY FULL WIDTH */}
//           <div className="mt-6">
//             <label className="text-gray-600 font-medium">Biography</label>
//             <textarea
//               rows="5"
//               placeholder="Tell us about yourself..."
//               className="input-box resize-none"
//             ></textarea>
//             <p className="text-xs text-gray-500 mt-1">
//               Your biography should have at least 50 words. Links are not allowed.
//             </p>
//           </div>

//           {/* SOCIAL LINKS SECTION */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

//             {/* LINKEDIN */}
//             <div>
//               <label className="text-gray-600 font-medium">LinkedIn</label>
//               <input
//                 type="text"
//                 placeholder="linkedin.com/in/username"
//                 className="input-box px-10"
//               />
//             </div> 
//           </div>

//           {/* SAVE BUTTON */}
//           <div className="mt-8">
//             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition">
//               Save Changes
//             </button>
//           </div>
//                  {/* DELETE ACCOUNT */}
//          <div
//         className="
//           mt-10 p-8 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl 
//           border border-red-300/50
//         "
//       >
//         <div className="flex items-center gap-3 text-red-600 text-xl font-semibold">
//           <FaTrashAlt /> Delete Account
//         </div>

//         <p className="text-slate-600 mt-2">
//           This action cannot be undone. Please proceed with caution.
//         </p>

//         <button
//           className="
//             mt-4 px-6 py-3 bg-red-600 text-white rounded-xl shadow-md 
//             hover:bg-red-700 transition-all
//           "
//         >
//           Delete My Account
//         </button>
//       </div>
//       </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SettingPage;
import SideBar from "./SideBar";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function SettingPage() {
  const [active, setActive] = useState(0);

  const menuItems = ["Instructors", "Learners", "Employees"];

  return (
    <div className="flex bg-gray-100 ml-10 w-full min-h-screen">

      {/* ----------------- SIDEBAR ----------------- */}
      <SideBar />

      {/* ----------------- MAIN PAGE ----------------- */}
      <div className="flex-1 p-8 lg:p-14 animate-fadeIn">

        {/* TOP MENU TABS */}
        <div className="flex border-b mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200
                ${
                  active === index
                    ? "border-b-2 border-purple-600 text-purple-700"
                    : "text-gray-600 hover:text-black"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-6">Profile & Settings</h1>

        {/* ----------------- MAIN CARD ----------------- */}
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField label="First Name" placeholder="Nisha" />
            <InputField label="Website" placeholder="URL" />

            <InputField label="Last Name" placeholder="Yadav" />
            <InputField label="Facebook" placeholder="facebook.com/username" />

            <InputField label="Headline" placeholder="Instructor at Udemy" maxLength={60} />
            <InputField label="Instagram" placeholder="instagram.com/username" />

          </div>

          {/* BIO SECTION */}
          <div className="mt-6">
            <label className="text-gray-600 font-medium">Biography</label>
            <textarea
              rows="5"
              placeholder="Tell us about yourself..."
              className="input-box resize-none w-full border rounded-md px-4 py-3 mt-1 focus:ring-2 focus:ring-purple-400"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Your biography should have at least 50 words. Links are not allowed.
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InputField label="LinkedIn" placeholder="linkedin.com/in/username" />
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-8">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* ----------------- DELETE ACCOUNT SECTION ----------------- */}
        <div className="mt-10 p-8 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-red-300/50">
          <div className="flex items-center gap-3 text-red-600 text-xl font-semibold">
            <FaTrashAlt /> Delete Account
          </div>

          <p className="text-slate-600 mt-2">
            This action cannot be undone. Please proceed with caution.
          </p>

          <button
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-all"
          >
            Delete My Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default SettingPage;

/* ----------------- REUSABLE INPUT FIELD COMPONENT ----------------- */
function InputField({ label, placeholder, maxLength }) {
  return (
    <div>
      <label className="text-gray-600 font-medium">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
        className="input-box w-full border rounded-md px-4 py-3 mt-1 focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}
