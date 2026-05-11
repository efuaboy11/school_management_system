'use client';
import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import '../css/component/themeToggleButton.css'; // Import your CSS file here
export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  return (
    <div onClick={toggleTheme} className="theme-btn lg-text">
      <p >
        {theme === 'light' ? (
          <i className="ri-moon-line"></i> // show moon in light mode
        ) : (
          <i className="ri-sun-line"></i> // show sun in dark mode
        )}
      </p>
    </div>

  );
};