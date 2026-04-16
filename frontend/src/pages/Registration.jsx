import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Api from "../services/Api";
// import { hashPassword } from "../utils/hash";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
};
function Registration() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [fullname,setfullname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [confirmpassword,setconfirmpassword]=useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");
 
  const handleSubmit =async(e)=>{
      e.preventDefault();
      // const hashed = await hashPassword(password);
      // console.log("HASHED PASSWORD:", hashed);
      const formdata = new FormData();
      formdata.append("fullname",fullname);
      formdata.append("email",email);
      formdata.append("password", password);
      
      if (emailError || passwordError || matchError) {
        alert("Fix validation errors first");
        return;
      }

      if (!fullname || !email || !password || !confirmpassword) {
        alert("All fields required");
        return;
      }
    
      try{
        await Api.post(
          "/stud_registration",
          formdata,
        );
        localStorage.setItem("fullName", fullname);
        localStorage.setItem("email", email);
        // localStorage.setItem("password", password);
        alert("Registered Successfully....")
        navigate("/login");
      }
      catch(error){
        console.log(error);
        alert("Registration Failed")
      }
    };

   // Email validation
  useEffect(() => {
    if (email === "") {
      setEmailError("");
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }, [email]);

  // Password strength
  useEffect(() => {
    if (password === "") {
      setPasswordError("");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "8+ chars, upper, lower, number & symbol required"
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  // Confirm password match
  useEffect(() => {
    if (confirmpassword && password !== confirmpassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  }, [password, confirmpassword]);

    // Open modal when page loads
    useEffect(() => {
    requestAnimationFrame(() => {
      setOpen(true);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("/"); // or "/login"
    }, 3000); // wait for animation
  };

  return (
    <div>
      {/* Modal Wrapper */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
        ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Overlay */}
        <div
          onClick={handleClose}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Modal */}
        <div
          className={`
            relative bg-white w-[380px] rounded-lg shadow-xl p-6
            transform transition-all duration-300 ease-out
            ${
              open
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-20 opacity-0 scale-95"
            }
          `}
        >
          {/* Header */} 
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Registration</h2>
            <button onClick={handleClose} className="text-gray-500 text-xl">
            </button>
          </div> 

          {/* Username */}
          <form onSubmit={handleSubmit} >
          <div className="mb-4">
              <label className="block text-sm mb-1">Fullname</label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full border rounded-md px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fullname} onChange={(e)=>setfullname(e.target.value)}
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full border rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e)=>setemail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}

          </div>

          
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e)=>setpassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={confirmpassword} 
               onChange={(e)=>setconfirmpassword(e.target.value)}
            />
            {matchError && (
            <p className="text-red-500 text-sm mt-1">{matchError}</p>
          )}
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Create an Account
          </button>
        </form>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Registration;
