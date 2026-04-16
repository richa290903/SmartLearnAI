import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';

// Initialize theme before React renders to prevent flash
const initializeTheme = () => {
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

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <ThemeProvider>
      {/* <StrictMode> */}
        <App />
      {/* </StrictMode>, */}
    </ThemeProvider>
   </BrowserRouter>
)
