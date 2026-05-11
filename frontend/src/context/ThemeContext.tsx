'use client';
import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  
  const [theme, setTheme] = useState<string>("light");
  console.log(theme)
  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme){
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    
  }, [])


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  const contextData = {
    theme,
    setTheme,
    toggleTheme,
  }
  
  return (
    <ThemeContext.Provider value={contextData}>
        {children}
    </ThemeContext.Provider>
  )
}