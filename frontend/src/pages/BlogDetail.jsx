import { useParams } from "react-router-dom";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

// const blogs = [
//   {
//     id: "1",
//     title: "How AI is Changing Online Learning",
//     desc: "Discover how artificial intelligence is revolutionizing personalized education platforms.",
//     author: "Nirjala Vegad",
//     date: "Jan 30, 2026",
//     category: "AI",
//     image: "/images/.jpeg",
//     content: [
//       {
//         type: "paragraph",
//         text: "Artificial Intelligence is no longer a futuristic concept. Today, AI is actively transforming how students learn."
//       },
//       {
//         type: "heading",
//         text: "Personalized Learning"
//       },
//       {
//         type: "paragraph",
//         text: "AI analyzes student behavior and learning speed to provide customized content."
//       },
//       {
//         type: "heading",
//         text: "Smart Assessments"
//       },
//       {
//         type: "paragraph",
//         text: "AI-powered systems automatically evaluate quizzes and assignments with instant feedback."
//       },
//       {
//         type: "heading",
//         text: "Virtual Tutors"
//       },
//       {
//         type: "paragraph",
//         text: "Chatbots and AI tutors act as 24/7 learning assistants."
//       }
//     ]
//   }
// ];
const menuItems = [
  "Instructors",
  "Learners",
  "Employees",
];
function BlogDetail() {
  const { id } = useParams();
  const [blog,setBlog]=useState(null);
  const [active, setActive] = useState(0);
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/single_blog_data/${id}`)
    .then(res=>setBlog(res.data))
    .then(err=>console.log(err))
  },[id])
   
  // const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <div className="text-center mt-20">Blog not found</div>;
  }
  return (
    <div className="mx-auto ">

        <div className="w-full ">
        {/* Top Menu */}
          {/* <div className="flex border-b">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`px-6 py-3 text-sm font-medium transition
                  ${
                    active === index
                      ? "border-b-2 border-purple-600 text-purple-700"
                      : "text-gray-600 hover:text-black"
                  }`}
              >
                {item}
              </button>
            ))}
          </div> */}
        {/* <!-- Container --> */}
      <div class="ml-20 mt-10">

        <div className="flex text-black-500">
           {/* <!-- Blog Image --> */}
          <span>
            <div class="image-holder"  >
              <img src={`http://localhost:8000/blogimages/${blog.blogimage}`}
                  alt="Blog Image"
                  class="img-set"
                  className="w-[400px] h-[600px] overflow-hidden rounded-xl"/>
            </div>
          </span>
            {/* <!-- Blog Meta --> */}
            <div>
              <div className="ml-10">
                 {/* <!-- Blog Title --> */}
                <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-6 ">{blog.blogtitle}</h1>
                <p className="text-bold">{new Date(blog.blogdate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}</p>
                    <br></br>
                <p >{blog.blogdescription}</p>
              </div>
            </div>
        </div>
       
        {/* <!-- Back Button --> */}
        <div class="mt-10">
          <button 
            class="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 transition">
            <Link to="/Blog"><h1>← Back to Blogs</h1></Link>
          </button>
        </div>
      </div>
      {/* Author Box */}
      <div className="mt-10 p-6 bg-gray-100 rounded-xl flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
          N
        </div>
        <div>
          {/* <h4 className="font-semibold">{blog.author}</h4> */}
          <p className="text-sm text-gray-600">
            Frontend Developer & AI Enthusiast
          </p>
        </div>
      </div>
    </div>
    </div>

  );
}
export default BlogDetail;
