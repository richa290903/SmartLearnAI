// import { useEffect, useState } from "react";
// import Api from "../services/Api";

// function LocationInfo({ prevStep, updateData, handleSubmit }) {

//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [data, setData] = useState({
//     state: "",
//     city: ""
//   });

//   // Fetch all states
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await Api.get("/states");
//         // console.log("States API:", res.data); 
//         setStates(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStates();
//   }, []);

//   // Fetch cities when state changes
//   const handleStateChange = async (e) => {
//   const stateId = e.target.value; // ✅ correct

//   setData({
//     ...data,
//     state: stateId,
//     city: ""
//   });

//   try {
//     const res = await Api.get(`/cities/${stateId}`);
//     setCities(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// };

//   // City change
//   const handleCityChange = (e) => {
//     setData({ ...data, city: e.target.value });
//   };

//   const onFinish = (e) => {
//     e.preventDefault();
//     updateData(data);
//     handleSubmit(); // final submit
//   };

//   return (
//     <form onSubmit={onFinish}>
//       <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
//         Location Information
//       </h3>

//       {/* State Dropdown */}
//       <div className="mb-5">
//         <label className="text-sm font-medium">State</label>

//         <select
//           value={data.state}
//           onChange={handleStateChange}
//           className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">Select State</option>

//           {states.map((state) => (
//             <option key={state.id} value={state.state_id}>
//               {state.state_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown */}
//       <div className="mb-6">
//         <label className="text-sm font-medium">City</label>

//         <select
//           value={data.city}
//           onChange={handleCityChange}
//           className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//           disabled={!data.state}
//         >
//           <option value="">Select City</option>

//           {cities.map((city) => (
//             <option key={city.city_id} value={city.city_idid}>
//               {city.city_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={prevStep}
//           className="px-5 py-2 rounded-md bg-gray-200"
//         >
//           Back
//         </button>

//         <button
//           type="submit"
//           className="px-6 py-2 rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500"
//         >
//           Finish
//         </button>
//       </div>
//     </form>
//   );
// }

// export default LocationInfo;

import { useEffect, useState } from "react";
import Api from "../services/Api";

function LocationInfo({ prevStep, updateData, handleSubmit }) {

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [data, setData] = useState({
    state_id: "",
    city_id: ""
  });

  // Fetch all states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await Api.get("/states");
        setStates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state changes
  const handleStateChange = async (e) => {
    const stateId = e.target.value;

    setData({
      state_id: stateId,
      city_id: ""
    });

    // update parent immediately
    updateData({ state_id: stateId, city_id: "" });

    try {
      const res = await Api.get(`/cities/${stateId}`);
      setCities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // City change
  const handleCityChange = (e) => {
    const cityId = e.target.value;

    setData({ ...data, city_id: cityId });

    //update parent
    updateData({ city_id: cityId });
  };

  const onFinish = (e) => {
    e.preventDefault();

    console.log("State:", data.state_id);
    console.log("City:", data.city_id);

    handleSubmit();
  };

  return (
    <form onSubmit={onFinish}>
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
        Location Information
      </h3>

      {/* State Dropdown */}
      <div className="mb-5">
        <label className="text-sm font-medium">State</label>

        <select
          value={data.state_id}
          onChange={handleStateChange}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="mb-6">
        <label className="text-sm font-medium">City</label>

        <select
          value={data.city_id}
          onChange={handleCityChange}
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          disabled={!data.state_id}
        >
          <option value="">Select City</option>

          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
        </select>
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
          Finish
        </button>
      </div>
    </form>
  );
}

export default LocationInfo;
