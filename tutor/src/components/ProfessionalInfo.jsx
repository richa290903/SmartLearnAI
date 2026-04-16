import { useState } from "react";

const qualifications = [
  "BCA - Bachelor of Computer Applications",
  "BSc CS - Bachelor of Science in Computer Science",
  "BSc IT - Bachelor of Science in Information Technology",
  "B.Tech CS - Bachelor of Technology in Computer Science",
  "B.Tech IT - Bachelor of Technology in Information Technology",
  "B.Tech AI & ML - Bachelor of Technology in Artificial Intelligence & Machine Learning",
  "B.E CE - Bachelor of Engineering in Computer Engineering",
  "BCom - Bachelor of Commerce",
  "BBA - Bachelor of Business Administration",
  "BA - Bachelor of Arts",

  "MCA - Master of Computer Applications",
  "MSc CS - Master of Science in Computer Science",
  "MSc DS - Master of Science in Data Science",
  "M.Tech CS - Master of Technology in Computer Science",
  "MBA IT - Master of Business Administration in Information Technology",
  "MBA BA - Master of Business Administration in Business Analytics",

  "Diploma CE - Diploma in Computer Engineering",
  "Diploma IT - Diploma in Information Technology",

  "Self-Taught - Self Learned (No Formal Degree)",
  "Working Professional IT - Industry Experience in IT",
  "Working Professional Non-IT - Industry Experience in Non-IT",

  "Computer Science - Field of Study",
  "Information Technology - Field of Study",
  "Artificial Intelligence - Field of Study",
  "Data Science - Field of Study",
  "Cyber Security - Field of Study",
  "Business Administration - Field of Study",
  "Commerce - Field of Study",
  "Arts - Field of Study"
];

const skillOptions = [
  // Programming
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
  "Internet of Things (IoT)"
];

function ProfessionalInfo({ nextStep, prevStep, updateData }) {

  const [data, setData] = useState({
    qualification: "",
    experience: "",
    skills: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(data);
    nextStep();
  };

  return (

    <form onSubmit={handleSubmit}>

      <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
        Professional Information
      </h3>

      <div className="mb-5">
        <label className="text-sm font-medium">Qualification</label>
       <select
          name="qualification"
          value={data.qualification}
          onChange={handleChange}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Qualification</option>

          {qualifications.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}

        </select>
      </div>

      <div className="mb-5">
        <label className="text-sm font-medium">Experience (Years)</label>
        <input
          name="experience"
          onChange={handleChange}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

     <div className="mb-6">
  <label className="text-sm font-medium">Skills</label>

  {/* Dropdown */}
  <select
  onChange={(e) => {
    const value = e.target.value;

    if (value && !data.skills.includes(value)) {
      setData({
        ...data,
        skills: [...data.skills, value]
      });
    }
  }}
  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
>
  <option value="">Select Skill</option>

  {skillOptions.map((skill, index) => (
    <option key={index} value={skill}>
      {skill}
    </option>
  ))}

</select>

{/* Selected Skills Display */}
{data.skills.length > 0 && (
  <p className="mt-2 text-sm text-gray-600">
    Selected: {data.skills.join(", ")}
  </p>
)}
</div>

      <div className="flex justify-between">

        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 rounded-md bg-gray-200"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Next
        </button>

      </div>

    </form>
  );
}

export default ProfessionalInfo;