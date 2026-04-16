import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function DarkMode() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`relative inline-flex items-center h-7 w-15 rounded-full p-1 transition-colors duration-300 ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}
    >
      <span
        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ${theme === "dark" ? "translate-x-8" : "translate-x-0"}`}
      />

      <span className="pointer-events-none absolute left-2 text-xs font-semibold text-slate-700 dark:text-slate-900">
        <BsSun />
      </span>
      <span className="pointer-events-none absolute right-2 text-xs font-semibold text-slate-100">
        <FiMoon />
      </span>
    </button>
  );
}