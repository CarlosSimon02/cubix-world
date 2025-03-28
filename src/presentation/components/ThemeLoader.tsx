"use client";

import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeLoader() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Load PrimeReact theme
    const themeLink = document.createElement("link");
    themeLink.id = "prime-theme";
    themeLink.rel = "stylesheet";
    themeLink.href = `/themes/lara-${resolvedTheme}-blue/theme.css`;
    document.head.appendChild(themeLink);

    return () => {
      document.head.removeChild(themeLink);
    };
  }, [resolvedTheme]);

  return null;
}
