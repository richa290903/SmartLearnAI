
// import React from "react";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import AppRoutes from "./routes/AppRoutes";


// function App() {
//   return (
//     <div>
//       <Header/> 
//       <AppRoutes></AppRoutes>
//       <Footer/>
//     </div>
//   )

// }

// export default App;


import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

