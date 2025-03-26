"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  themeMode: "light" | "dark";
  isSystemTheme: boolean;
  toggleTheme: () => void;
  setSystemTheme: (useSystem: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>(null!);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  const getSystemPreference = useCallback(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedIsSystemTheme = localStorage.getItem("isSystemTheme");

    if (savedDarkMode !== null && savedIsSystemTheme === "false") {
      setIsSystemTheme(false);
      setThemeMode(savedDarkMode === "true" ? "dark" : "light");
    } else {
      setIsSystemTheme(true);
      setThemeMode(getSystemPreference() ? "dark" : "light");
    }
  }, [getSystemPreference]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (isSystemTheme) {
        setThemeMode(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isSystemTheme]);

  const toggleTheme = useCallback(() => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
    setIsSystemTheme(false);
    localStorage.setItem("darkMode", String(newMode === "dark"));
    localStorage.setItem("isSystemTheme", "false");
  }, [themeMode]);

  const setSystemTheme = useCallback(
    (useSystem: boolean) => {
      setIsSystemTheme(useSystem);
      localStorage.setItem("isSystemTheme", String(useSystem));
      if (useSystem) {
        setThemeMode(getSystemPreference() ? "dark" : "light");
      }
    },
    [getSystemPreference]
  );

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isSystemTheme,
        toggleTheme,
        setSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
