"use client";

import { useTheme } from "@/presentation/contexts/ThemeContext";
import { Button } from "primereact/button";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      icon={`pi pi-${resolvedTheme === "dark" ? "sun" : "moon"}`}
      onClick={toggleTheme}
      className="p-button-rounded p-button-text"
      aria-label="Toggle theme"
      tooltip={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    />
  );
}
