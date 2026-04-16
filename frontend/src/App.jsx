
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <div>
       {/* <BrowserRouter> */}
        <Header/> 
        <AppRoutes></AppRoutes>
        <Footer/>
      {/* </BrowserRouter> */}
    </div>
  )

}

export default App;

