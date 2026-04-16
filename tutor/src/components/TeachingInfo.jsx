import { useState } from "react";

const languageOptions = [
  "English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Bengali",
  "Urdu"
];

function TeachingInfo({ nextStep, prevStep, updateData }) {

  const [data, setData] = useState({
    category: "",
    level: "",
    language: ""
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
        Teaching Information
      </h3>

      <div className="mb-5">
<div className="mb-4">
  <label className="text-sm font-medium">Languages</label>

  <select
    onChange={(e) => {
      const value = e.target.value;

      if (value && !data.language.includes(value)) {
        setData({
          ...data,
          language: [...data.language, value]
        });
      }

      e.target.value = ""; // reset dropdown
    }}
    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Language</option>

    {languageOptions.map((lang, index) => (
      <option key={index} value={lang}>
        {lang}
      </option>
    ))}
  </select>

  {/* Selected Languages (comma separated) */}
  {data.language.length > 0 && (
    <p className="mt-2 text-sm text-gray-600">
      Selected: {data.language.join(", ")}
    </p>
  )}
</div>

      </div>
      <div className="mb-6">

        <textarea
        name="bio"
        placeholder="Write short teaching description..."
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      />
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

export default TeachingInfo;