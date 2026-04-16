import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Api from "../services/Api";

function InstructorProfile() {

const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    mobile: "",
    qualification: [],
    experience: "",
    skills: [],
    bio: "",
    language: [],
    state_id: "",
    city_id: "",
  });

  // ================= GET USER + PROFILE =================
  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        //  Get logged user
        const res = await Api.get("/me");

        const user = res.data;
        setAuthUser(user);

        setFormData((prev) => ({
          ...prev,
          fullname: user.fullname || "",
        }));

        //  CALL PROFILE API (IMPORTANT FIX)
        fetchInstructor(user.user_id);

      } catch (err) {
        console.log("USER ERROR:", err);
      }
    };

    fetchUserAndProfile();
  }, []);

  // ================= FETCH INSTRUCTOR PROFILE =================
  const fetchInstructor = async (user_id) => {
    try {
      const res = await Api.get(`/get_instructor_by_user/${user_id}`);

      const data = res.data;
      console.log("PROFILE DATA:", data);

      setFormData((prev) => ({
        ...prev,
        gender: data.gender || "",
        mobile: data.mobile || "",
        qualification: data.qualification
        ? data.qualification.split(",").map((q) => q.trim())
        : [],
        experience: data.experience || "",
        skills: data.skills ? data.skills.split(",") : [],
        bio: data.bio || "",
        language: data.language ? data.language.split(",") : [],
        state_id: data.state_id || "",
        city_id: data.city_id || "",
      }));

      if (data.state_id) {
        fetchCities(data.state_id);
      }

    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  };

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

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= STATE CHANGE =================
  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state_id: stateId,
      city_id: "",
    }));

    if (stateId) {
      fetchCities(stateId);
    } else {
      setCities([]);
    }
  };

  // ================= MULTI SELECT =================
  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);

    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      await Api.post(`/insert_update_instructor_profile`, {
        gender: formData.gender || null,
        mobile: formData.mobile || null,
        qualification: formData.qualification.length ? formData.qualification.join(",") : null,
        experience: formData.experience || null,
        bio: formData.bio || null,
        state_id: formData.state_id ? Number(formData.state_id) : null,
        city_id: formData.city_id ? Number(formData.city_id) : null,
        skills: formData.skills.length ? formData.skills.join(",") : null,
        language: formData.language.length ? formData.language.join(",") : null,
      });

      alert("Profile Updated Successfully!");
      setIsEditing(false);
    } catch (err) {
      console.log(err.response?.data);
      alert("Update Failed");
    }
  };



  const skillOptions = [ // Programming
  "C", "C++", "Java", "Python", "JavaScript",

  // Development
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "React",
  "Angular",
  "Node.js",

  // AI / Data
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Data Science",
  "Data Analytics",
  "Generative AI",
  "Natural Language Processing (NLP)",
  "Computer Vision",

  // DevOps / Cloud
  "DevOps",
  "Cloud Computing",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",

  // Security / Blockchain
  "Cyber Security",
  "Ethical Hacking",
  "Blockchain",
  "Web3",

  // Marketing
  "Digital Marketing",
  "Social Media Marketing",
  "Search Engine Optimization (SEO)",
  "Google Ads",
  "Meta Ads",
  "Content Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Influencer Marketing",
  "Performance Marketing",

  // Business / Management
  "Business Development",
  "Product Management",
  "Project Management",
  "Entrepreneurship",
  "Startup Strategy",
  "Business Analytics",

  // Design / Creative
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
  "Content Creation",
  "Personal Branding",

  // Modern Tech
  "No-Code / Low-Code Development",
  "Automation",
  "Prompt Engineering",
  "AR/VR",
  "Internet of Things (IoT)"];

  const languageOptions = ["English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Bengali",
  "Urdu"];

  const QualificationOptions = [ "BCA",
    "BSc - Computer Science",
    "BSc - IT",
    "B.Tech - Computer Science",
    "B.Tech - IT",
    "B.Tech - AI & ML",
    "B.E - Computer Engineering",
    "BCom - Bachelor of Commerce",
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
    "Arts",]



return (
  <div className="min-h-screen bg-gray-100 flex">
    <SideBar />

    <div className="flex-1 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Instructor Profile
            </h2>
            <p className="text-sm text-gray-500">
              Manage your personal and professional details
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* USER INFO */}
        <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              value={formData.fullname || ""}
              disabled
              className="w-full mt-1 border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              value={authUser?.email || ""}
              disabled
              className="w-full mt-1 border p-2 rounded"
            />
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              disabled={!isEditing}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              name="mobile"
              value={formData.mobile}
              disabled={!isEditing}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* QUALIFICATION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Qualification
          </h3>

          <select
            multiple
            value={formData.qualification || []}
            disabled={!isEditing}
            onChange={(e) => handleMultiSelect(e, "qualification")}
            className="w-full border p-2 rounded h-40"
          >
            {QualificationOptions.map((q, i) => (
              <option key={i} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* EXPERIENCE + BIO */}
        <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Experience</label>
            <input
              name="experience"
              value={formData.experience}
              disabled={!isEditing}
              onChange={handleChange}
              placeholder="Years of experience"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              disabled={!isEditing}
              onChange={handleChange}
              placeholder="Write about yourself..."
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* SKILLS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Skills
          </h3>

          <select
            multiple
            value={formData.skills}
            disabled={!isEditing}
            onChange={(e) => handleMultiSelect(e, "skills")}
            className="w-full border p-2 rounded h-40"
          >
            {skillOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* LANGUAGES */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Languages
          </h3>

          <select
            multiple
            value={formData.language}
            disabled={!isEditing}
            onChange={(e) => handleMultiSelect(e, "language")}
            className="w-full border p-2 rounded h-32"
          >
            {languageOptions.map((l, i) => (
              <option key={i} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* LOCATION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Location
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="state_id"
              value={formData.state_id}
              disabled={!isEditing}
              onChange={handleStateChange}
              className="border p-2 rounded"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.state_id} value={s.state_id}>
                  {s.state_name}
                </option>
              ))}
            </select>

            <select
              name="city_id"
              value={formData.city_id}
              disabled={!isEditing}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  </div>

);
}
export default InstructorProfile;