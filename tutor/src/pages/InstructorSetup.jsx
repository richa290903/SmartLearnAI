  // import { useState } from "react";
  // import BasicInfo from "../components/BasicInfo";
  // import ProfessionalInfo from "../components/ProfessionalInfo";
  // import TeachingInfo from "../components/TeachingInfo";
  // import LocationInfo from "../components/LocationInfo";
  // import { useNavigate } from "react-router-dom";
  // import Api from "../services/Api";

  // function InstructorSetup() {
  //   const [step, setStep] = useState(1);
  //   const [formData, setFormData] = useState({});
  //   const navigate = useNavigate();

  //   const nextStep = () => setStep(step + 1);
  //   const prevStep = () => setStep(step - 1);

  //   const updateData = (data) => {
  //     setFormData((prev) => ({ ...prev, ...data }));
  //   };

  //   const handleSubmit = async () => {
  //     try {
  //       const user_id = localStorage.getItem("user_id");

  //       if (!user_id) {
  //         alert("User not logged in");
  //         return;
  //       }

  //       //  Validate required fields (prevents NaN issue)
  //       if (!formData.state_id || !formData.city_id) {
  //         alert("Please select state and city");
  //         return;
  //       }

  //       // Prepare payload safely
  //       const payload = {
  //         ...formData,
  //         photo: formData.photo || "",
  //         experience: Number(formData.experience),
  //         // convert array → string if needed by backend
  //         skills: Array.isArray(formData.skills)
  //           ? formData.skills.join(",")
  //           : formData.skills,
  //         language: Array.isArray(formData.language)
  //           ? formData.language.join(",")
  //           : formData.language,
  //         state_id: Number(formData.state_id),
  //         city_id: Number(formData.city_id),
          
  //       };

  //       console.log("FINAL PAYLOAD:", payload);

  //       const res = await Api.post(
  //         `/insert_update_instructor_profile/${user_id}`,
  //         payload
  //       );

  //       if (res.data.status) {
  //         navigate("/Dashboard");
  //       } else {
  //         alert("Profile creation failed");
  //       }
  //     } catch (err) {
  //       console.error("FULL ERROR:", err.response?.data || err);
  //       alert("Error submitting profile");
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
  //         <h2 className="text-xl font-bold text-center mb-6">
  //           Instructor Setup
  //         </h2>

  //         {step === 1 && (
  //           <BasicInfo nextStep={nextStep} updateData={updateData} />
  //         )}

  //         {step === 2 && (
  //           <ProfessionalInfo
  //             nextStep={nextStep}
  //             prevStep={prevStep}
  //             updateData={updateData}
  //           />
  //         )}

  //         {step === 3 && (
  //           <TeachingInfo
  //             nextStep={nextStep}
  //             prevStep={prevStep}
  //             updateData={updateData}
  //           />
  //         )}

  //         {step === 4 && (
  //           <LocationInfo
  //             prevStep={prevStep}
  //             updateData={updateData}
  //             handleSubmit={handleSubmit}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // export default InstructorSetup;

  import { useState } from "react";
  import BasicInfo from "../components/BasicInfo";
  import ProfessionalInfo from "../components/ProfessionalInfo";
  import TeachingInfo from "../components/TeachingInfo";
  import LocationInfo from "../components/LocationInfo";
  import { useNavigate } from "react-router-dom";
  import Api from "../services/Api";

  function InstructorSetup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const updateData = (data) => {
      setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleSubmit = async () => {
      try {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
          alert("User not logged in");
          return;
        }

        //  Validate required fields (prevents NaN issue)
        if (!formData.state_id || !formData.city_id) {
          alert("Please select state and city");
          return;
        }

        // Prepare payload safely
        const payload = {
          ...formData,
          photo: formData.photo || "",
          experience: Number(formData.experience),
          // convert array → string if needed by backend
          skills: Array.isArray(formData.skills)
            ? formData.skills.join(",")
            : formData.skills,
          language: Array.isArray(formData.language)
            ? formData.language.join(",")
            : formData.language,
          state_id: Number(formData.state_id),
          city_id: Number(formData.city_id),
          
        };

        console.log("FINAL PAYLOAD:", payload);

        const res = await Api.post(
          `/insert_update_instructor_profile/${user_id}`,
          payload
        );

        if (res.data.status) {
          navigate("/Dashboard");
        } else {
          alert("Profile creation failed");
        }
      } catch (err) {
        console.error("FULL ERROR:", err.response?.data || err);
        alert("Error submitting profile");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
          <h2 className="text-xl font-bold text-center mb-6">
            Instructor Setup
          </h2>

          {step === 1 && (
            <BasicInfo nextStep={nextStep} updateData={updateData} />
          )}

          {step === 2 && (
            <ProfessionalInfo
              nextStep={nextStep}
              prevStep={prevStep}
              updateData={updateData}
            />
          )}

          {step === 3 && (
            <TeachingInfo
              nextStep={nextStep}
              prevStep={prevStep}
              updateData={updateData}
            />
          )}

          {step === 4 && (
            <LocationInfo
              prevStep={prevStep}
              updateData={updateData}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    );
  }

  export default InstructorSetup;