// presentation/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "@/presentation/contexts/ThemeContext";
import { Button } from "primereact/button";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "dark" ? "pi-moon" : "pi-sun";
  const tooltipText = `Switch to ${theme === "light" ? "dark" : "light"} mode`;

  return (
    <Button
      icon={`pi ${themeIcon}`}
      onClick={toggleTheme}
      className="p-button-rounded p-button-text"
      aria-label="Toggle theme"
      tooltip={tooltipText}
    />
  );
}
