import { useState } from "react";
import { Link , useNavigate} from "react-router";
import Api from "../services/Api"; 

function BlogForm() {

    const [blogername,setBlogerName] = useState("");
    const [blogerrole,setBlogerRole] = useState("");
    const [blogimage,setBlogImage] = useState("");
    const [blogtitle,setBlogTitle] = useState("");
    const [blogdescription,setBlogDiscription] = useState("");
    const [imagePreview,setImagePreview] = useState("");
    const navigate=useNavigate();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   role: "",
  //   title: "",
  //   desc: "",
  //   image: null,
  // });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: files ? files[0] : value,
  //   });
  // };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData=new FormData(); 
            formData.append("blogername",blogername);
            formData.append("blogerrole",blogerrole);
            formData.append("blogimage",blogimage);
            formData.append("blogtitle",blogtitle);
            formData.append("blogdescription",blogdescription);
                      
      try {
        await Api.post("/blog", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Inserted successfully!");
        navigate("/blog");

      } catch (error) {
          console.error(error.response?.data);
          alert("Insert Failed");
      }

  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

  };

  return (
    <div>
    <div class="mt-10 ml-30">
      <button 
        class="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 transition">
        <Link to="/Blog"><h1>← Back to Blogs</h1></Link>
      </button>
    </div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-5">
        <h2 className="text-2xl font-bold text-center">
          Create Blog
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Author Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border px-4 py-2 rounded-lg"
            value={blogername}
            onChange={(e)=>{setBlogerName(e.target.value)}}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Role
          </label>
          <select
            name="role"
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e)=>setBlogerRole(e.target.value)}
            required
            value={blogerrole}
          >
            <option value="">Select role</option>
            <option value="Instructor">Instructor</option>
            <option value="Learner">Learner</option>
            <option value="Employees">Employees</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Blog Image
          </label>
            <input type="file" name="blogimage" accept="image/*" onChange={(e)=>{
                  const file=e.target.files[0];
                  
                  setBlogImage(file);
                  setImagePreview(URL.createObjectURL(file));
                  }}/>
                  {
                    imagePreview &&(
                    <img
                      src={imagePreview}
                      alt="preview"
                      width="100px"
                      style={{margin:"10px"}}>
                    </img>
                  )
                  }
          </div>
          <div>
          <label className="block text-sm font-medium mb-1">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e)=>setBlogTitle(e.target.value)}
            value={blogtitle}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="desc"
            rows="4"
            placeholder="Write blog description..."
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e)=>setBlogDiscription(e.target.value)}
            value={blogdescription}
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition" > 
          Publish Blog
        </button>
      </form>
    </div>
</div>
  );
}
export default BlogForm;  
