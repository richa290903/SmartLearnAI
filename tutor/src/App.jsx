import MyCourses from "./MyCourse";
import QnaPage from "./QnA";
import SideBar from "./SideBar";
import { Routes, Route } from "react-router-dom";
import CourseUpload from "./CourseUpload";
import SettingPage from "./SettingPage";
import Dashboard from "./Dashboard";
function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<MyCourses/>} />
        <Route path="/SideBar" element={<SideBar/>} />
        <Route path="/QnaPage" element={<QnaPage/>} />
        <Route path="/MyCourses" element={<MyCourses/>}></Route>
        <Route path="/CourseUpload" element={<CourseUpload/>}></Route>
        <Route path="/SettingPage" element={<SettingPage/>}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
