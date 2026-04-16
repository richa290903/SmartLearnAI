import MyCourse from "../pages/MyCourse";
import QnA from "../pages/QnA";
// import SideBar from "../components/SideBar";
import { Routes, Route } from "react-router-dom";
import CourseUpload from "../pages/CourseUpload";
import InstructorProfile from "../pages/InstructorProfile";
import Dashboard from "../pages/Dashboard";
import CourseDatail from "../pages/CourseDatail";
import InstructorSetup from "../pages/InstructorSetup";
import ProfileSetup from "../pages/ProfileSetup";
import ModuleUpload from "../pages/ModuleUploads";
import CourseDisplay from "../../../frontend/src/pages/CourseDisplay";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<MyCourse></MyCourse>} />
        <Route path="/qnapage" element={<QnA/>} />
        <Route path="/coursedetail/:id" element={<CourseDatail />}></Route>
        <Route path="/courseupload" element={<CourseUpload/>}></Route>
        <Route path="/instructorprofile" element={<InstructorProfile />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/instructorsetup" element={<InstructorSetup />}></Route>
        <Route path="/profilesetup" element={<ProfileSetup />}></Route>
        <Route path="/module/upload/:course_id" element={<ModuleUpload />} />
        <Route path="/coursedisplay/:course_id" element={<CourseDisplay />} />
      </Routes>
  );
}
export default AppRoutes;
