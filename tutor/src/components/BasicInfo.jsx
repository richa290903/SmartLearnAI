import { useState } from "react";
import { Camera } from "lucide-react";

function BasicInfo({ nextStep, updateData }) {

  const [data, setData] = useState({
    photo: null,
    gender: "",
    mobile: ""
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setData({
        ...data,
        photo: file
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(data);
    nextStep();
  };

  return (

    <form onSubmit={handleSubmit}>

      <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
        Basic Information
      </h3>

      {/* PHOTO UPLOAD */}

      <div className="flex flex-col items-center mb-8">

        <label className="cursor-pointer relative">

          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 shadow-lg">

            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={40} className="text-gray-400" />
              )}

            </div>

          </div>

          {/* Camera Icon */}

          <div className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow">
            <Camera size={16} />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

        </label>

        <p className="text-sm text-gray-500 mt-3">
          Upload your profile photo
        </p>

      </div>

      {/* GENDER */}

      <div className="mb-6">

        <label className="block text-sm mb-2 font-medium">
          Gender
        </label>

        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        >

          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>

        </select>

      </div>

      {/* MOBILE */}

      <div className="mb-6">

        <label className="block text-sm mb-2 font-medium">
          Mobile Number
        </label>

        <input
          type="text"
          name="mobile"
          value={data.mobile}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        />

      </div>

      {/* NEXT BUTTON */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-md hover:opacity-90"
        >
          Next
        </button>

      </div>

    </form>
  );
}

export default BasicInfo;