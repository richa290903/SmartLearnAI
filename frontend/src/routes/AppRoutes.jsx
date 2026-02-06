import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import About from "../pages/About";
import ForgotPassword from "../pages/ForgotPassword";
import Contact from "../pages/Contact";
import Course from "../pages/Course";
import Profile from "../pages/Profile";
import ProfileTop from "../components/ProfileTop";
import ContactDetail from "../components/ContactDetail";
import ProfessionalDetail from "../components/ProfessionalDetail";
import Acedemic from "../pages/Acedemic";
import  Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import BlogForm from "../pages/BlogForm";


function AppRoutes(){
      return(
            // <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About></About>} />
                        <Route path="/login" element={<Login></Login>} />
                        <Route path="/registration" element={<Registration></Registration>}/>
                        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}/>
                        <Route path="/contact" element={<Contact></Contact>}></Route>
                        <Route path="/course" element={<Course></Course>}></Route>
                        <Route path="/profile" element={<Profile></Profile>}></Route>
                        <Route path="/profiletop" element={<ProfileTop></ProfileTop>}/>
                        <Route path="/contactdetail" element={<ContactDetail></ContactDetail>}></Route>
                        <Route path="/professionaldetail" element={<ProfessionalDetail></ProfessionalDetail>}></Route>
                        <Route path="/acadmic" element={<Acedemic></Acedemic>}></Route>
                        <Route path="/blog" element={<Blog/>}></Route>
                        <Route path="/blogdetail" element={<BlogDetail/>}></Route>
                        <Route path="/blogform" element={<BlogForm></BlogForm>}></Route>
                  </Routes>
            // </BrowserRouter>
      )
}
export default AppRoutes;