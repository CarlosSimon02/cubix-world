"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  isSystemTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme || "system";
    setThemeState(initialTheme);
    setResolvedTheme(
      initialTheme === "system" ? (systemDark ? "dark" : "light") : initialTheme
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const newResolvedTheme =
      theme === "system" ? (systemDark ? "dark" : "light") : theme;

    setResolvedTheme(newResolvedTheme);
    root.classList.remove("light", "dark");
    root.classList.add(newResolvedTheme);
    root.style.setProperty("color-scheme", newResolvedTheme);

    // Load PrimeReact theme
    const themeLink = document.getElementById("prime-theme") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/themes/lara-${newResolvedTheme}-blue/theme.css`;
    }

    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => setThemeState(theme),
    isSystemTheme: theme === "system",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
