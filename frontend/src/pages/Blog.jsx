    import {Link} from "react-router";
    import { useEffect, useState } from "react";
    import Api from "../services/Api";

    const menuItems = [
      "All",
      "Instructors",
      "Learners",
      "Employees",
    ];
    function Blog() {
      const [active, setActive] = useState(0);
      const [blogData,setBlogData] =useState("");

      const fetchdata = async()=>{
            const response=await Api.get("/blog_display");
            setBlogData(response.data);
      };

      useEffect(()=>{
        fetchdata();
      },[]);
       
      const roleMap = [null, "Instructors", "Learner", "Employees"];

      const filteredBlogs = Array.isArray(blogData)
        ? roleMap[active] === null
        ? blogData
        : blogData.filter(
        (blog) => blog.blogerrole === roleMap[active]
        )
    : [];
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Hero */}
            <div className="relative w-full h-[90vh] mt-10">
            
            {/* Background Image */}  
            <img
              src="/images/p1.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/50"></div> */}

            {/* Content */}
            <div className="relative z-10 flex flex-col  h-full  max-w-2xl text-gray-700 md:text-BLUE-300  ">
                <p className="text-sm uppercase tracking-widest ml-50 mt-40 mb-3" />
                <h1 className="text-4xl font-bold leading-tight ml-20">
                  Build Skills for the Future.
                  <br />
                <div>
                  <span className="">
                    Learn from industry experts and boost your career with <u className="color-blue-400">SmartLearn.AI </u>
                    
                  </span>
                </div>
                </h1>
                <br></br>
                {/* <p>
                  <button className="absolute right-2 top-2 bg-emerald-500 text-white px-6 py-2 rounded-full">
                      Upload Blog
                    </button>
                </p> */}
                  <div  className="ml-20">
              <Link to="/blogform">
                <button className="absolute  bg-blue-500 text-white px-6 py-2 rounded-full ">
                    Upload Blog
                </button>
              </Link>
            </div>  
            
            </div>
          
            </div>
          {/* Top Menu */}
            <div className="flex border-b mt-5 mb-10">
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
            </div>
          <div className="max-w-8xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-30">
        
            {filteredBlogs.map((blog) => (
            <div
              key={blog.blog_id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative group"
              >
                {/* Image */}
                <div className="relative w-full h-[500px] overflow-hidden">
                  <img
                    src={`http://localhost:8000/blogimages/${blog.blogimage}`}
                    alt={blog.blogtitle}
                    className="absolute inset-0 w-[400px] h-[500px] object-cover transition duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500"></div>
                  {/* // // Center text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                      <span className="text-white text-lg font-semibold">
                          <Link to={`/blogdetail/${blog.blog_id}`}><h1> View Blog</h1></Link>
                      </span>
                  </div>   
                </div> 
                <div className="p-6">
                          <span className="text-sm text-datkblue-600 font-semibold">
                            {blog.blogerrole}
                          </span>

                          <h2 className="text-xl font-bold mt-1">
                            {blog.blogtitle}
                          </h2>
                          
                          <p className="text-gray-600 mt-2" >
                            {blog.blogdescription.slice(0,30)}....
                          </p>
                          <p className="text-bold">{new Date(blog.blogdate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}</p>
                        {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                            <span>By {blog.author}</span>
                            <span>{blog.date}</span> 
                        </div> */}
              </div>
              </div>
          ))}
          </div>
          </div>
        </div>
      );
    }
    export default Blog;
