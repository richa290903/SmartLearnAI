import { Bluetooth } from "lucide-react";
import Profile from "./SidebarProfile";
import ProfileTop from "./ProfileTop";
function ContactDetail()
{
    return(
        <div class="inset-shadow-sm">
            <ProfileTop />
        <div className="flex shadow-xl border-none ">
          <Profile/>  
            <section className="flex-1 bg-white border rounded-xl p-8  border-none shadow-xl mt-10 mr-5 mb-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
        
          <h2 className="text-xl font-semibold mb-1">Contact Details</h2>
          <p className="text-gray-500 mb-6">The following details will be required for issuing certificates. Please enter them carefully.</p>
          
        <div className="max-h-[70vh] overflow-y-auto pr-3">
        <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="font-medium block mb-1">Email<span className="text-red-500">*</span></label>
          <input
            type="email" className="w-full border bg-gray-100 rounded-lg px-4 py-2" placeholder="Enter the Email"
          />
        </div>

           
        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 mb-1">Contact number*</label>
          <div className="flex gap-3">
            <select className="border rounded-lg px-3 py-2">
              <option>IN</option>
            </select>
            <input
              type="text"
              value="+91"
              className="w-20 border rounded-lg px-3 py-2" />
            <input
              type="text"
              placeholder="0000000000"
              className="flex-1 border rounded-lg px-4 py-2"
            />
          </div>
        </div>
            {/* Country */}
        <div>
          <label className="block text-gray-700 mb-1">Country of residence*</label>
          <select className="w-full border rounded-lg px-4 py-2">
            <option>--Select--</option>
            <option>--Select--</option>
            <option>--Select--</option>
            <option>--Select--</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700 mb-1">State*</label>
          <select className="w-full border rounded-lg px-4 py-2">
            <option>--Select--</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 mb-1">City*</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </form>
          </div>
        </section>

        </div>
        </div>
    )
}export default ContactDetail;