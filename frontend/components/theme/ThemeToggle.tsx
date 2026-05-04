"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative p-2 text-primary transition-colors duration-200 bg-bg-secondary outline-0 rounded-full"
      aria-label="Toggle theme"
    >
      {/* Sun Icon: Visible only when .dark class is present on html */}
      <Sun 
        className="hidden dark:block h-5 w-5 sm:h-[19px] sm:w-[19px]" 
        strokeWidth={1.75} 
      />
      
      {/* Moon Icon: Hidden when .dark class is present on html */}
      <Moon 
        className="block dark:hidden h-5 w-5 sm:h-[19px] sm:w-[19px]" 
        strokeWidth={1.75} 
      />
    </button>
  );
}