import MyCourse from "../pages/MyCourse";
import QnA from "../pages/QnA";
// import SideBar from "../components/SideBar";
import { Routes, Route } from "react-router-dom";
import CourseUpload from "../pages/CourseUpload";
import SettingPage from "../pages/SettingPage";
import Dashboard from "../pages/Dashboard";
import CourseDatail from "../pages/CourseDatail";
import Student from "../pages/Student";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<MyCourse></MyCourse>} />
        {/* <Route path="/sideBar" element={<SideBar/>} /> */}
        <Route path="/qnapage" element={<QnA/>} />
        <Route path="/coursedetail/:id" element={<CourseDatail />}></Route>
        <Route path="/courseupload" element={<CourseUpload/>}></Route>
        <Route path="/settingpage" element={<SettingPage/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
      </Routes>
  );
}
export default AppRoutes;
