import SidebarProfile from "../components/SidebarProfile";
import ProfileTop from "../components/ProfileTop";
function Profile()
{
    return(
        <div class="inset-shadow-sm">
            <ProfileTop />
        <div className="flex shadow-xl border-none ">
          <SidebarProfile/>  
          <section className="flex-1 bg-white border rounded-xl p-8  border-none shadow-xl mt-10 mr-5 mb-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
           <main className="flex-1 overflow-y-auto scrollbar-hide p-10">
          <h2 className="text-xl font-semibold mb-1">Basic details</h2>
          <p className="text-gray-500 mb-6">The following details will be required for issuing certificates. Please enter them carefully.</p>
          
        <div className="max-h-[70vh] overflow-y-scroll scroll-smooth scrollbar-hide pr-3">
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="font-medium block mb-1">Title<span className="text-red-500">*</span></label>
              <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400">
                <option>Ms.</option>
                <option>Mrs.</option>
                <option>Mr.</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="font-medium block mb-1">First name<span className="text-red-500">*</span></label>
              <input type="text" placeholder="First Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* Middle Name */}
            <div>
              <label className="font-medium block mb-1">Middle name</label>
              <input type="text" placeholder="Middle Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>

            {/* Last Name */}
            <div>
              <label className="font-medium block mb-1">Last name<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            {/* Gender */}
            <div>
                <label className="font-medium block mb-1">Gender<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            {/* Date of birth */}
            <div>
                <label className="font-medium block mb-1">Date Of Birth<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            {/* photo */}
            <div>
                <label className="font-medium block mb-1">Photo<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            {/* Linkedln */}
            <div>
            <label className="font-medium block mb-1">Linkedin Url<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            {/* Language */}
            <div>
            <label className="font-medium block mb-1">Language<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
            <label className="font-medium block mb-1">Last name<span className="text-red-500">*</span></label>
              <input type="text" placeholder="LAst Name" className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="">
              <button class="bg-blue-300 shadow-lg shadow-blue-700/50 px-5 py-5 rounded-lg border-none"  type="Submit">SAVE CHANGES</button>
            </div>
          </form>
          </div>
          </main>
        </section>

        </div>
        </div>
    )
}
export default Profile;