// import React from "react";
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from 'react-router-dom';


// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     {/* <StrictMode> */}
//       <App />
//     {/* </StrictMode>, */}  
//    </BrowserRouter>
// )


// import React from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";

// // ---------- THEME INIT LOGIC ----------
// const savedTheme = localStorage.getItem("theme") || "light";

// if (savedTheme === "dark") {
//   document.documentElement.classList.add("dark");
// } else {
//   document.documentElement.classList.remove("dark");
// }
// // --------------------------------------

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App theme={savedTheme} />
//   </BrowserRouter>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Initialize theme before React renders to prevent flash
const initializeTheme = () => {
    if (typeof window === "undefined") return "light";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.classList.add(savedTheme);
        return savedTheme;
    }

    // Check system preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme = prefersDark ? "dark" : "light";
    document.documentElement.classList.add(systemTheme);
    return systemTheme;
};

initializeTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);