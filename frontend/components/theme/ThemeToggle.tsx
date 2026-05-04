"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 text-primary transition-colors duration-200 bg-bg-secondary outline-0 rounded-full"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-5 w-5 sm:h-[19px] sm:w-[19px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-5 w-5 sm:h-[19px] sm:w-[19px]" strokeWidth={1.75} />
      )}
    </button>
  );
}
