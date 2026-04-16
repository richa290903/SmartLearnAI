  
// import { useState } from "react";
// import Api from "../services/Api";
// import { FiUpload, FiVideo, FiImage } from "react-icons/fi";

// export default function ModuleUpload() {
//   const [formData, setFormData] = useState({
//     course_id: "",
//     title: "",
//     description: "",
//   });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState("");

//   const [video, setVideo] = useState(null);
//   const [videoPreview, setVideoPreview] = useState("");

//   const [uploadProgress, setUploadProgress] = useState(0);

//   const[description,setDescription]=useState("");
//   const[title,setTitle]=useState("");
//   const[course_id,setCourse_id]=useState("");
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(!thumbnail ||! video){
//         alert("PLease select thumbain and video");
//           return;
        
//     }
//     const fd = new FormData();
//     // Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
//     // fd.append("thumbnail", thumbnail);
//     // fd.append("video", video);
//     fd.append("course_id",course_id);
//     fd.append("title", title);
//     fd.append("description", description);
//     fd.append("thumbnail", thumbnail);
//     fd.append("video", video);

//     try {
//       const res = await Api.post("/module/upload3", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (p) => {
//           setUploadProgress(Math.round((p.loaded / p.total) * 100));
//         },
//       });

//       alert("Module Created Successfully!");
//     } catch (err) {
//       console.log(err);
//       alert("Upload Failed!");
//     }
//   };

//   return (
//     <div className="w-full flex justify-center py-10 animate-fadeIn">
//       <form
//         onSubmit={handleSubmit}
//         className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl 
//         rounded-2xl p-8 w-[500px] flex flex-col gap-6 animate-slideUp"
//       >
//         <h2 className="text-3xl font-bold text-center text-purple-700 drop-shadow-sm">
//           Create New Module
//         </h2>

//         {/* Course ID */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold text-gray-800">Course ID</label>
//           <input
//             type="number"
//             name="course_id"
//             value={formData.course_id}
//             onChange={handleChange}
//             className="inputBox"
//             required
//           />
//         </div>

//         {/* Title */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold text-gray-800">Module Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="inputBox"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col gap-1">
//           <label className="font-semibold text-gray-800">Description</label>
//           <textarea
//             name="description"
//             rows={3}
//             value={formData.description}
//             onChange={handleChange}
//             className="inputBox"
//           />
//         </div>

//         {/* Thumbnail Upload */}
//         <div className="uploadBox">
//           <label className="uploadLabel">
//             <FiImage className="text-xl" /> Upload Thumbnail
//           </label>

//           <input
//             type="file"
//             id="thumbInput"     
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;
//               setThumbnail(file);
//               setThumbnailPreview(URL.createObjectURL(file));
//             }}
//           />

//           <div
//             className="dropZone"
//             onClick={() => document.getElementById("thumbInput").click()}
//           >
//             {thumbnailPreview ? (
//               <img
//                 src={thumbnailPreview}
//                 className="previewImg"
//                 alt="Thumbnail Preview"
//               />
//             ) : (
//               "Click to upload thumbnail"
//             )}
//           </div>
//         </div>

//         {/* Video Upload */}
//         <div className="uploadBox">
//           <label className="uploadLabel">
//             <FiVideo className="text-xl" /> Upload Video
//           </label>

//           <input
//             type="file"
//             id="videoInput"
//             accept="video/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;
//               setVideo(file);
//               setVideoPreview(URL.createObjectURL(file));
//             }}
//           />

//           <div
//             className="dropZone"
//             onClick={() => document.getElementById("videoInput").click()}
//           >
//             {videoPreview ? (
//               <video controls className="previewVideo">
//                 <source src={videoPreview} />
//               </video>
//             ) : (
//               "Click to upload video"
//             )}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         {uploadProgress > 0 && (
//           <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden shadow-inner">
//             <div
//               className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button className="submitBtn">Create Module</button>
//       </form>

//       {/* Tailwind Extra Styles */}
//       <style>{`
//         .inputBox {
//           padding: 10px;
//           border-radius: 10px;
//           border: 1px solid #cfcfcf;
//           background: white;
//           outline: none;
//           transition: 0.3s;
//         }
//         .inputBox:focus {
//           border-color: #8b5cf6;
//           box-shadow: 0 0 5px rgba(139,92,246,0.5);
//         }
//         .uploadBox {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }
//         .uploadLabel {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: bold;
//           color: #4b5563;
//         }
//         .dropZone {
//           border: 2px dashed #a78bfa;
//           padding: 20px;
//           text-align: center;
//           border-radius: 15px;
//           background: white;
//           cursor: pointer;
//           transition: 0.3s;
//         }
//         .dropZone:hover {
//           background: #f3e8ff;
//           transform: scale(1.02);
//         }
//         .previewImg {
//           width: 180px;
//           border-radius: 10px;
//           margin: auto;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.2);
//         }
//         .previewVideo {
//           width: 220px;
//           border-radius: 10px;
//           margin: auto;
//         }
//         .submitBtn {
//           background: linear-gradient(to right, #7c3aed, #4f46e5);
//           color: white;
//           padding: 12px;
//           border-radius: 12px;
//           font-weight: bold;
//           transition: 0.3s;
//           letter-spacing: 1px;
//         }
//         .submitBtn:hover {
//           transform: scale(1.05);
//           box-shadow: 0 6px 15px rgba(79,70,229,0.4);
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState } from "react";
import Api from "../services/Api";

function ModuleUpload() {
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail || !video) {
      alert("Please select both thumbnail & video");
      return;
    }

    const fd = new FormData();
    fd.append("course_id", formData.course_id);
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("thumbnail", thumbnail);
    fd.append("video", video);

    try {
      const res = await Api.post("/module/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (p) => {
          setUploadProgress(Math.round((p.loaded / p.total) * 100));
        },
      });

      alert("Module uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Module</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="course_id"
          placeholder="Course ID"
          value={formData.course_id}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          name="title"
          placeholder="Module Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <textarea
          name="description"
          placeholder="Module Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        ></textarea>

        <label className="block mb-2">Thumbnail:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="mb-4"
        />

        <label className="block mb-2">Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="mb-4"
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}

export default ModuleUpload;