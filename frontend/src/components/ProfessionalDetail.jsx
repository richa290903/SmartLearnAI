import ProfileTop from "./ProfileTop";
import SidebarProfile from "./SidebarProfile";

function ProfessionalDetail()
{
    return(
    <div>
        <div class="inset-shadow-sm">
           <ProfileTop/>
            <div className="flex shadow-xl border-none ">
                {/* <Profile/>  */}
                <SidebarProfile/>

                <section className="flex-1 bg-white border rounded-xl p-8  border-none shadow-xl mt-10 mr-5 mb-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
                <h2 className="text-xl font-semibold mb-1">Professional Details</h2>
                <form className="space-y-5">
                    {/* Highest Qualification */}
                    <div>
                        <label className="block text-gray-700 mb-1">Highest Qualification*</label>
                        <select className="w-full border rounded-lg px-4 py-2">
                            <option>--Select--</option>
                            <option>Bachelor’s Degree</option>
                            <option>Master’s Degree</option>
                            <option>PhD</option>
                            <option>Diploma</option>
                            <option>Other</option>
                        </select>
                    </div>
                    {/* Current Job Role */}
                    <div>
                        <label className="block text-gray-700 mb-1">Current Job Role*</label>
                        <select className="w-full border rounded-lg px-4 py-2">
                            <option>--Select--</option>
                            <option>Software Developer</option>
                            <option>Data Analyst</option>
                            <option>Student</option>
                            <option>Intern</option>
                            <option>Working Professional</option>
                            <option>Other</option>
                        </select>
                    </div>
                    {/* Industry */}
                    <div>
                    <label className="block text-gray-700 mb-1">Industry*</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                        <option>--Select--</option>
                        <option>Information Technology</option>
                        <option>Education</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Other</option>
                    </select>
                    </div>
                    {/* Total Work Experience */}
            <div>
            <label className="block text-gray-700 mb-1">Total Work Experience*</label>
            <select className="w-full border rounded-lg px-4 py-2">
                <option>--Select--</option>
                <option>0 - 1 years</option>
                <option>1 - 3 years</option>
                <option>3 - 5 years</option>
                <option>5+ years</option>
            </select>
            </div>
                </form>
                </section>
            </div>
        </div>
    </div>
    )
}export default ProfessionalDetail;