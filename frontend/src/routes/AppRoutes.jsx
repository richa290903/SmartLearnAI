import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import About from "../pages/About";
import ForgotPassword from "../pages/ForgotPassword";
import Contact from "../pages/Contact";
import Course from "../pages/Course";
import  Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import BlogForm from "../pages/BlogForm";
import ExampleProfile from "../pages/ExampleProfile";
import Profilesection1 from "../pages/Profilesection1";
import CoursesPage1 from "../pages/CoursePage1";
import Analyticssession1 from "../pages/Analyticssection1";
import CourseDisplay from "../pages/CourseDisplay";
import AllCourses from "../pages/AllCourses";
import Landing from "../pages/Landing";
import { AuthProvider, AuthContext } from "../AuthContext";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";


function AppRoutes(){
      const { user, loading } = useContext(AuthContext);

      if (loading) return <p>Loading...</p>;

      return(
                  <Routes>
                        {/* If NOT logged in → show landing */}
                        {!user && (
                        <>
                              <Route path="/" element={<Landing />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/registration" element={<Registration></Registration>}/>
                        </>
                        )}

                        {/* If logged in → allow all pages */}
                        {user && (
                        <>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/about" element={<About></About>} />
                        <Route path="/login" element={<Login></Login>} />
                        <Route path="/registration" element={<Registration></Registration>}/>
                        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}/>
                        <Route path="/contact" element={<Contact></Contact>}></Route>
                        <Route path="/contact/:user_id" element={<Contact></Contact>}></Route>
                        <Route path="/course" element={<Course></Course>}></Route>
                        <Route path="/coursedisplay/:course_id" element={<CourseDisplay />}></Route>
                        <Route path="/allcourses" element={<AllCourses />}></Route>
                        <Route path="/blog" element={<Blog/>}></Route>
                        <Route path="/blogdetail/:id" element={<BlogDetail/>}></Route>
                        <Route path="/blogform" element={<BlogForm></BlogForm>}></Route>
                        <Route path="/exampleprofile" element={<ExampleProfile></ExampleProfile>}></Route>
                        <Route path="/profilesection" element={<Profilesection1/>}></Route>
                        <Route path="/coursepage" element={<CoursesPage1/>}></Route>
                        <Route path="/analyticspage" element={<Analyticssession1/>}></Route>
                        
    
                        </>
                        )}

                       
                  </Routes>    

      )
}
// export default AppRoutes;


function App() {
  return (
    <AuthProvider>
      {/* <BrowserRouter> */}
        <AppRoutes />
      {/* </BrowserRouter> */}
    </AuthProvider>
  );
}

export default App;
