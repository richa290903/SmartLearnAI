import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import {
  FiUpload,
  FiVideo,
  FiTag,
  FiPlusCircle,
  FiX,
  FiBookOpen,
} from "react-icons/fi";


function CourseUpload() {
  const [modules, setModules] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const aiTagSuggestions = ["python", "machine learning", "ai", "react", "nodejs"];
  const [course_title,setCourseTitle]=useState();
  const[ category,setCategory]=useState();
  const[skill_level,setSkillLevel]=useState();
  const[prerequisites,setPrerequisites]=useState();
  const[description,setDescription]=useState();
  const[tag,setTag]=useState();
  const[thumbnail,setThumbnail]=useState();
  const[video,setVideo]=useState();
  const [imagePreview,setImagePreview] = useState("");
  const [videoPreview,setVideoPreview]=useState("");
  // const [formData, setFormData] = useState();
  const navigate=useNavigate();

  const addModule = () => {
    setModules([...modules, { title: "", lessons: [] }]);
  };

  const addLesson = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].lessons.push({ title: "", video: "" });
    setModules(updated);
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };


  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   const formData=new FormData(); 
  //           formData.append("course_title",course_title);
  //           formData.append("category", category);
  //           formData.append("skill_level",skill_level);
  //           formData.append("prerequisites",prerequisites);
  //           formData.append("description",description);
  //           formData.append("tag",tag);
  //           formData.append("thumbnail",thumbnail);
  //           formData.append("video",video);
                      
  //     try {
  //       await Api.post("/course_upload", formData, {
  //         headers: { "Content-Type": "multipart/form-data" }
  //       });
  //       alert("Inserted successfully!");
  //       navigate("/course_upload");

  //     } catch (error) {
  //         console.error(error.response?.data);
  //         alert("Insert Failed");
  //     }

  // for (let pair of formData.entries()) {
  // console.log(pair[0], pair[1]);}

  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("course_title", course_title);
  fd.append("category", category);
  fd.append("skill_level", skill_level);
  fd.append("prerequisites", prerequisites);
  fd.append("description", description);
  fd.append("tag", tag);
  fd.append("thumbnail", thumbnail);
  fd.append("video", video);

  try {
    await Api.post("/course_upload", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    alert("Inserted successfully!");
    navigate("/course_upload");
  } catch (error) {
    console.error(error.response?.data);
    alert("Insert Failed");
  }

  // PRINT VALUES
  for (let pair of fd.entries()) {
    console.log(pair[0], pair[1]);
  }
};

  // console.log("skill_level", skill_level);
  return (
  <div className="flex-1 flex justify-center px-6">
            <SideBar />
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Upload New Course</h1>
        <p className="text-gray-500 mb-10">Fill all details to publish your course</p>

        {/* FORM */}
        <form  onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Title */}
              <div className="group">
                <label className="font-semibold text-gray-700 mb-2 block">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full p-3 rounded-lg border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  onChange={(e)=>setCourseTitle(e.target.value)}
                />
              </div>

              {/* Category */}
          <div className="group">
              <label className="font-semibold text-gray-700 mb-2 block">Category</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e)=>setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option>Development</option>
                <option>Artificial Intelligence & Data Science</option>
                <option>IT & Software</option>
                <option>Business</option>
                <option>Personal Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
          </div>

          {/* Skill Level */}
          <div className="group">
            <label className="font-semibold text-gray-700 mb-2 block">Skill Level</label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e)=>setSkillLevel(e.target.value)}
            >
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Prerequisites */}
          <div className="group">
            <label className="font-semibold text-gray-700 mb-2 block">Prerequisites</label>
            <input
              type="text"
              placeholder="Ex: Basic Python knowledge"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e)=>setPrerequisites(e.target.value)}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8 group">
          <label className="font-semibold text-gray-700 mb-2 block">Description</label>
          <textarea
            rows="5"
            placeholder="Enter full course description..."
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e)=>setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* TAGS */}
        <div className="mt-8">
          <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiTag /> Tags (AI Suggested)
          </label>
          <input
            type="text"
            placeholder="Ex: python, ai, machine learning"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"onChange={(e)=>setTag(e.target.value)}
          />

          <div className="mt-3 flex gap-3 flex-wrap">
            {aiTagSuggestions.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* THUMBNAIL UPLOAD */}
        <div className="mt-10">
          <label className="font-semibold text-gray-700 mb-3 block flex items-center gap-2">
            <FiUpload /> Course Thumbnail
          </label>

          {/* <input
            type="file"
            accept="image/*"
            id="thumbnailInput"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              // if (file) alert("Thumbnail selected: " + file.name);
                  setThumbnail(file);
                  setImagePreview(URL.createObjectURL(file));
            }}/> */}
            <input
              type="file"
              accept="image/*"
              id="thumbnailInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setThumbnail(file);
                setImagePreview(URL.createObjectURL(file));
            }}/>
          <div
            onClick={() => document.getElementById("thumbnailInput").click()}
            className="border-2 border-dashed border-blue-300 rounded-xl p-10 flex flex-col justify-center items-center 
            hover:border-blue-600 hover:bg-blue-50 transition cursor-pointer"
          >
            <FiUpload size={40} className="text-blue-600 mb-3" />
            <p className="text-gray-600">Click to upload thumbnail</p>
          </div>
                 {
                    imagePreview &&(
                    <img
                      src={imagePreview}
                      alt="preview"
                      width="300px"
                      style={{margin:"10px"}}>
                    </img>
                  )
                  }
        </div>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* VIDEO UPLOAD */}
        <div className="mt-10">
          <label className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FiVideo /> Course Videos
          </label>

          {/* <input
            type="file"
            accept="video/*"
            id="videoUploadInput"
            className="hidden"
            multiple
            // onChange={(e) => {
            //   const files = Array.from(e.target.files);
            //   if (files.length > 0) alert("Selected videos:\n" + files.map(f => f.name).join("\n"));
                onChange={(e)=>{
                  const file=e.target.files[0];
                  setVideo(file);
                  setVideoPreview(URL.createObjectURL(file));
                  }}

          /> */}
                    <input
                    type="file"
                    accept="video/*"
                    id="videoUploadInput"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setVideo(file);
                      setVideoPreview(URL.createObjectURL(file));
                    }}
                  />


          <div
            onClick={() => document.getElementById("videoUploadInput").click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col justify-center items-center 
            hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
          >
            <FiVideo size={40} className="text-blue-600 mb-3" />
            <p className="text-gray-600">Click to upload lesson videos</p>
                 {
                  videoPreview && (
                    <video
                      src={videoPreview}
                      width="260"
                      controls
                      className="mt-4 rounded-lg shadow"
                    ></video>
                  )
                }
          </div>
        </div>
        {/* MODULE BUILDER */}
        {/* <div className="mt-10">
          <label className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FiBookOpen /> Modules & Lessons
          </label>

          <button
            onClick={addModule}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <FiPlusCircle /> Add Module
          </button>

          <div className="mt-4 space-y-5">
            {modules.map((mod, modIndex) => (
              <div
                key={modIndex}
                className="p-5 rounded-xl border border-gray-300 bg-gray-50 shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Module Title"
                    className="p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <FiX
                    className="text-red-500 text-xl ml-3 cursor-pointer"
                    onClick={() =>
                      setModules(modules.filter((_, i) => i !== modIndex))
                    }
                  />
                </div>

                <div className="mt-4 pl-3 border-l-4 border-blue-400">
                  {mod.lessons.map((_, lessonIndex) => (
                    <div key={lessonIndex} className="mb-3">
                      <input
                        type="text"
                        placeholder="Lesson Title"
                        className="p-2 w-full mb-2 rounded-lg border border-gray-300"
                      />
                      <input
                        type="text"
                        placeholder="Video URL"
                        className="p-2 w-full rounded-lg border border-gray-300"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => addLesson(modIndex)}
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                  >
                    + Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* SUBMIT BUTTON */}
        <div className="mt-14 flex justify-end">
          <button className="px-10 py-3 bg-blue-600 text-white rounded-xl text-lg shadow-lg hover:bg-blue-700 transition" type="submit">
            Publish Course
          </button>
        </div>
            </form>
      </div>
    </div>
  );
}

export default CourseUpload;
