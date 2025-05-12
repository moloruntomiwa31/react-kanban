import { useState, useEffect } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (systemPreference) {
        setTheme("dark");
      }
    }, []);
    useEffect(() => {
      const html = document.documentElement;
      html.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    return {toggleTheme, theme}
}