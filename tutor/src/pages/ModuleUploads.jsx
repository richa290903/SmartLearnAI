import { useState } from "react";
import Api from "../services/Api";
import { FiVideo, FiImage } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

export default function ModuleUpload() {
  const { course_id } = useParams(); // ✅ GET FROM URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course_id) {
      alert("Course ID missing!");
      return;
    }

    if (!title || !video || !thumbnail) {
      alert("All fields are required!");
      return;
    }

    const fd = new FormData();
    fd.append("course_id", course_id);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("thumbnail", thumbnail);
    fd.append("video", video);

    try {
      await Api.post(`/module/upload/${course_id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          setUploadProgress(Math.round((p.loaded / p.total) * 100));
        },
      });

      alert("✅ Module Created Successfully!");
      navigate(`/`); // redirect

    } catch (err) {
      console.log("Upload Error:", err.response?.data);
      alert("❌ Upload Failed");
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl backdrop-blur-lg bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 space-y-6 transition-all duration-300"
    >
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-700">
          Create Module
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Course ID: <span className="font-semibold">{course_id}</span>
        </p>
      </div>

      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Module Title
        </label>
        <input
          type="text"
          placeholder="Enter module title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none transition"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none transition"
        />
      </div>

      {/* FILE UPLOADS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* THUMBNAIL */}
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-4 text-center cursor-pointer hover:bg-purple-50 transition">
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <FiImage className="text-3xl text-purple-500" />
            <span className="text-sm text-gray-600">
              Upload Thumbnail
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setThumbnail(file);
                setThumbnailPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              className="w-24 h-16 object-cover rounded mt-3 mx-auto shadow"
            />
          )}
        </div>

        {/* VIDEO */}
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50 transition">
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <FiVideo className="text-3xl text-blue-500" />
            <span className="text-sm text-gray-600">
              Upload Video
            </span>

            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setVideo(file);
                setVideoPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {videoPreview && (
            <video controls className="w-28 mt-3 rounded mx-auto shadow">
              <source src={videoPreview} />
            </video>
          )}
        </div>

      </div>

      {/* PROGRESS BAR */}
      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white 
        bg-gradient-to-r from-purple-600 to-blue-500 
        hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
      >
        Upload Module
      </button>
    </form>
  </div>
);

}