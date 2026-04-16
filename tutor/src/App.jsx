// import MyCourse from "../pages/MyCourse";
// import QnA from "../pageas/QnA";
// import SideBar from "./SideBar";
// import { Routes, Route } from "react-router-dom";
// import CourseUpload from "./CourseUpload";
// import SettingPage from "./SettingPage";
// import Dashboard from "./Dashboard";
// import CourseDatail from "./CourseDatail";

// function App() {
//   return (
//     <div className="flex">
//       <Routes>
//         <Route path="/" element={<MyCourse></MyCourse>} />
//         <Route path="/sideBar" element={<SideBar/>} />
//         <Route path="/qnapage" element={<QnA/>} />
//         <Route path="/coursedetail/:id" element={<CourseDatail />}></Route>
//         <Route path="/courseupload" element={<CourseUpload/>}></Route>
//         <Route path="/settingpage" element={<SettingPage/>}></Route>
//         <Route path="/dashboard" element={<Dashboard/>}></Route>
//       </Routes>
//     </div>
//   );
// }
// export default App;


import SideBar from "./components/SideBar";
import AppRoutes from "./Routes/AppRoutes";

function App(){
  return(
    <div>
      
      <AppRoutes/>
      {/* <SideBar/> */}
    </div>
  )
}
export default App;