
import { useState,useEffect  } from "react";
import BasicInfo from "../components/BasicInfo";
import ProfessionalInfo from "../components/ProfessionalInfo";
import TeachingInfo from "../components/TeachingInfo";
import LocationInfo from "../components/LocationInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../services/Api";


function ProfileSetup() {

 const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [userId, setUserId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  //  GET USER ID FROM URL AND STORE SAFELY
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlUserId = params.get("user_id");

    console.log("URL user_id:", urlUserId);

    if (urlUserId) {
      //  clear old wrong values (fix 9 → 19 issue)
      localStorage.removeItem("user_id");

      localStorage.setItem("user_id", urlUserId);
      setUserId(urlUserId);

      console.log("Stored user_id:", urlUserId);
    } else {
      const storedId = localStorage.getItem("user_id");

      if (storedId) {
        setUserId(storedId);
      } else {
        alert("User not logged in");
        navigate("/login");
      }
    }
  }, [location.search, navigate]);

  // STEP FUNCTIONS
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  //  FINAL SUBMIT
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing. Please login again.");
        return;
      }

      const payload = new FormData();

      payload.append("gender", formData.gender);
      payload.append("mobile", formData.mobile);
      payload.append("qualification", formData.qualification);
      payload.append("bio", formData.bio || "");

      payload.append("experience", Number(formData.experience));
      payload.append("state_id", Number(formData.state_id));
      payload.append("city_id", Number(formData.city_id));

      payload.append("language", formData.language?.join(",") || "");
      payload.append("skills", formData.skills?.join(",") || "");

      if (formData.photo) {
        payload.append("photo", formData.photo);
      }

      console.log("Submitting userId:", userId);

      const res = await Api.post(
        `/insert_update_instructor_profile/${userId}`,
        payload
      );

      console.log(res.data);
      alert("Profile Created Successfully");

      //  redirect after success
      navigate("/dashboard");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Profile creation failed");
    }
  };


  return (
    <div className="max-w-xl mx-auto p-5">

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
  );
}

export default ProfileSetup;