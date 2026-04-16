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
import CoursePaymentinfo from "../pages/coursePaymentinfo";
import Payment from "../pages/Payment";
import ThemeTest from "../pages/ThemeTest";
import Invoice from "../pages/invoice";
import PaymentSuccess from "../pages/paymentsuccess";
import MyCourses from "../pages/My_course";
function AppRoutes(){
      return(
                  <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About></About>} />
                        <Route path="/login" element={<Login></Login>} />
                        <Route path="/registration" element={<Registration></Registration>}/>
                        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}/>
                        <Route path="/contact" element={<Contact></Contact>}></Route>
                        <Route path="/contact/:user_id" element={<Contact></Contact>}></Route>
                        <Route path="/course" element={<Course></Course>}></Route>
                        <Route path="/coursedisplay/:id" element={<CourseDisplay />}></Route>
                        <Route path="/allcourses" element={<AllCourses />}></Route>
                        <Route path="/blog" element={<Blog/>}></Route>
                        <Route path="/blogdetail/:id" element={<BlogDetail/>}></Route>
                        <Route path="/blogform" element={<BlogForm></BlogForm>}></Route>
                        {/* <Route path="/exampleprofile" element={<ExampleProfile></ExampleProfile>}></Route> */}
                        <Route path="/exampleprofile/:stud_id" element={<ExampleProfile></ExampleProfile>}></Route>
                        {/* <Route path="/profilesection" element={<Profilesection1/>}></Route> */}
                        <Route path="/profilesection/:stud_id" element={<Profilesection1/>}></Route>
                        <Route path="/coursepage" element={<CoursesPage1/>}></Route>
                        <Route path="/payment" element={<Payment/>}></Route>
                        <Route path="/analyticspage" element={<Analyticssession1/>}></Route>
                        <Route path="/coursepaymentinfo/:course_id" element={<CoursePaymentinfo/>}></Route>
                        <Route path="/themetest" element={<ThemeTest/>}></Route>
                        <Route path="/invoice" element={<Invoice/>}></Route>
                        <Route path="/my_course" element={<MyCourses/>}></Route>
                        <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
                  </Routes>    
      )
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
export default AppRoutes;