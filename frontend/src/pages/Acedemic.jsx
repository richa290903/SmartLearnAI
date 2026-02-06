import { Bluetooth } from "lucide-react";
import Profile from "./Profile";
import ProfileTop from "../components/ProfileTop";
import { useState } from "react";
import SidebarProfile from "../components/SidebarProfile";
function Acedemic(){
        const educationLevels = [
        "High School Diploma / Secondary School Certificate",
        "Associate's Degree / Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate (PhD) / Professional Degree (MD, JD etc)",
        "Other",
        ];
        const [highestEdu, setHighestEdu] = useState("");
        const [experiences, setExperiences] = useState([]);
        const addExperience = () => {
        setExperiences([ ...experiences,{ id: Date.now(), institute: "", degree: "", year: "" },
         ]);
  };
        const updateExperience = (id, field, value) => {
        setExperiences(
        experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
        )
        );
        };
        const deleteExperience = (id) => {
        setExperiences(experiences.filter((exp) => exp.id !== id));
         };
    return(
    <div>
        <div class="inset-shadow-sm">
            <ProfileTop />
            <div className="flex shadow-xl border-none ">
                <SidebarProfile/>
                <section className="flex-1 bg-white border rounded-xl p-8  border-none shadow-xl mt-10 mr-5 mb-5 bg-indigo-500 shadow-lg shadow-indigo-500/50">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"> Academics</h2>
                    <div className="max-h-[70vh] overflow-y-auto pr-3">
                        <form className="space-y-5">
                            {/* Highest Level of Education */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Highest level of education <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={highestEdu}
                                    onChange={(e) => setHighestEdu(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                                    <option value="">Select Education Level</option>
                                    {educationLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>))}
                                </select>
                            </div>
                            
                            {/* Academic Experiences */}
                            <div className="mb-4 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Academic Experience(s)</h3>
                                <button
                                    onClick={addExperience}
                                    className="text-blue-600 font-medium hover:underline">+ Add
                                </button>
                            </div>
                              {/* Dynamic Experience Fields */}
                            <div className="space-y-4">
                                {experiences.map((exp) => (
                                    <div
                                            key={exp.id}
                                            className="border p-4 rounded-lg bg-gray-50 relative"
                                            >
                                            <button
                                                onClick={() => deleteExperience(exp.id)}
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input type="text"placeholder="Institute Name"
                                            className="border rounded-lg p-2 w-full"value={exp.institute}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "institute", e.target.value)
                                            }/>
                                            <input
                                                type="text"
                                                placeholder="Degree / Program"
                                                className="border rounded-lg p-2 w-full"
                                                value={exp.degree}
                                                onChange={(e) =>
                                                    updateExperience(exp.id, "degree", e.target.value)
                                                }
                                                />
                                                <input type="text"placeholder="Passing Year"className="border rounded-lg p-2 w-full"value={exp.year}
                                                onChange={(e) =>updateExperience(exp.id, "year", e.target.value)} />
                                        </div>
                                    </div>))}
                                {/* Buttons */}
                                    <div className="flex gap-4 mt-8">
                                            <button className="border border-gray-400 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-100">Discard
                                            </button>
                                            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">Save changes
                                            </button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    </div>
       
    )
}export default Acedemic;