import { useEffect, useState } from "react";
import Sidebar1 from "../components/sidebar1";
import Api from "../services/Api";
import { useParams } from "react-router-dom";

function Profilesection1() {

  const { stud_id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [userId, setUserId] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    education: "",
    state_id: "",
    city_id: "",
    skills: [],
    languages: [],
  });

  // ================= GET LOGGED USER =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    Api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setUserId(res.data.user_id);
        setAuthUser(res.data);

        setFormData((prev) => ({
          ...prev,
          fullname: res.data.fullname || ""
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await Api.get("/get_student_by_user",{
           withCredentials: true
        });
        const data = res.data;

        setFormData((prev) => ({
          ...prev,
          age: data.age || "",
          education: data.education || "",
          state_id: data.state_id || "",
          city_id: data.city_id || "",
          skills: data.skills
            ? data.skills.split(",").map((s) => s.trim())
            : [],
          languages: data.language
            ? data.language.split(",").map((l) => l.trim())
            : [],
        }));

        if (data.state_id) {
          fetchCities(data.state_id);
        }

      } catch (err) {
        console.log("Profile Error:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  // ================= LOAD STATES =================
  useEffect(() => {
    Api.get("/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ================= LOAD CITIES =================
  const fetchCities = async (stateId) => {
    try {
      const res = await Api.get(`/cities/${stateId}`);
      setCities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state_id: stateId,
      city_id: "",
    }));

    if (stateId) fetchCities(stateId);
    else setCities([]);
  };

  const handleMultiSelect = (e, field) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => ({
      ...prev,
      [field]: selectedValues,
    }));
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    const payload = {
      age: formData.age ? Number(formData.age) : null,
      education: formData.education || null,
      state_id: formData.state_id ? Number(formData.state_id) : null,
      city_id: formData.city_id ? Number(formData.city_id) : null,
      skills: formData.skills,
      language: formData.languages,
    };

    try {
      await Api.post(`/insert_update_profile/${userId}`, payload);
      alert("Updated Successfully!");
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };


  // OPTIONS
  const educationOptions = [
    "BCA",
    "BSc - Computer Science",
    "BSc - IT",
    "B.Tech - Computer Science",
    "B.Tech - IT",
    "B.Tech - AI & ML",
    "B.E - Computer Engineering",
    "BCom",
    "BBA",
    "BA",
    "MCA",
    "MSc - Computer Science",
    "MSc - Data Science",
    "M.Tech - Computer Science",
    "MBA - IT",
    "MBA - Business Analytics",
    "Diploma - Computer Engineering",
    "Diploma - IT",
    "Self-Taught",
    "Working Professional - IT",
    "Working Professional - Non-IT",
    "Computer Science",
    "Information Technology",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
    "Business Administration",
    "Commerce",
    "Arts",
  ];


  const skillOptions = [
  "C/C++",
  "Java",
  "Python",
  "JavaScript",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "React",
  "Angular",
  "Node.js",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Data Science",
  "Data Analytics",
  "Generative AI",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "DevOps",
  "Cloud Computing",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Cyber Security",
  "Ethical Hacking",
  "Blockchain",
  "Web3",
  "Digital Marketing",
  "Social Media Marketing",
  "SEO (Search Engine Optimization)",
  "Google Ads",
  "Meta Ads",
  "Content Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Influencer Marketing",
  "Performance Marketing",
  "Business Development",
  "Product Management",
  "Project Management",
  "Entrepreneurship",
  "Startup Strategy",
  "Business Analytics",
   "UI/UX",
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
  "Content Creation",
  "Personal Branding",
  "No-Code / Low-Code Development",
  "Automation",
  "Prompt Engineering",
  "AR/VR",
  "IoT",
  ];

  const languageOptions = [
    "English",
    "Hindi",
    "Gujarati",
    "Spanish",
    "French",
    "German",
    "Other"
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64">
        <Sidebar1 />
      </div>

      <div className="flex-1 p-10 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

          {/* Header */}
          <div className="flex justify-between mb-8">
            <h2 className="text-2xl font-bold">Profile Information</h2>

            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-indigo-500 text-white px-6 py-2 rounded-full">Edit </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-5 py-2 rounded-full"
                >
                  Cancel
                </button>
                <button onClick={handleUpdate} className="bg-indigo-500 text-white px-5 py-2 rounded-full" >Save</button>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-6">

         {/* Full Name */}
             <div>
               <label className="block text-gray-600 mb-2">Full Name</label>
               <input
                type="text"
                name="fullname"
                value={formData.fullname}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl border ${
                  isEditing ? "border-indigo-400" : "bg-gray-100"
                }`}
              />
            </div>

             {/* Email */}
            <div>
               <label className="block text-gray-600 mb-2">Email</label>
               <input
                 type="email"
                 value={authUser?.email || ""}
                 disabled
                 className="w-full p-3 rounded-xl bg-gray-100 border"
               />
             </div>

             <div>
              <label className="block text-gray-600 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                disabled={!isEditing}
                onChange={handleChange}
               className={`w-full p-3 rounded-xl border ${
                  isEditing ? "border-indigo-400" : "bg-gray-100"
                }`}
                placeholder="Age"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Education</label>
              <select
                name="education"
                value={formData.education}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl border ${
                  isEditing ? "border-indigo-400" : "bg-gray-100"
                }`}
              >
                <option value="">Select Education</option>
                {educationOptions.map((edu, i) => (
                  <option key={i} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
            </div>

           <div>
              <label className="block text-gray-600 mb-2">Select State</label>
              <select
                  name="state_id"
                  value={formData.state_id}
                  disabled={!isEditing}
                  onChange={handleStateChange}
                  className={`w-full p-3 rounded-xl border ${
                    isEditing ? "border-indigo-400" : "bg-gray-100"
                  }`}
                >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.state_id} value={state.state_id}>
                {state.state_name}
              </option>
            ))}
          </select>
          </div>

          <div>
              <label className="block text-gray-600 mb-2">Select City</label>
              <select
                name="city_id"
                value={formData.city_id}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full p-3 rounded-xl border ${
                  isEditing ? "border-indigo-400" : "bg-gray-100"
                }`}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
              </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <label className="block text-gray-600 mb-2">Skills</label>

           <select
              multiple
              value={formData.skills}
              disabled={!isEditing}
              onChange={(e) => handleMultiSelect(e, "skills")}
              className={`w-full p-3 rounded-xl border ${
                isEditing ? "border-indigo-400" : "bg-gray-100"
              }`}
            >
              {skillOptions.map((skill, i) => (
                <option key={i} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Languages */}
          <div className="mt-6">
            <label className="block text-gray-600 mb-2">Languages</label>
            <select
              multiple
              value={formData.languages}
              disabled={!isEditing}
              onChange={(e) => handleMultiSelect(e, "languages")}
              className={`w-full p-3 rounded-xl border ${
                  isEditing ? "border-indigo-400" : "bg-gray-100"
                }`}
            >
              {languageOptions.map((lang, i) => (
                <option key={i} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default Profilesection1;

