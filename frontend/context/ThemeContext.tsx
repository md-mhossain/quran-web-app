"use client";

import { THEME_STORAGE_KEY, type ColorScheme } from "@/lib/theme";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

function readStoredTheme(): ColorScheme {
  if (typeof window === "undefined") return "light";
  const boot = window.__QURAN_THEME__;
  if (boot === "dark" || boot === "light") return boot;
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function applyColorScheme(theme: ColorScheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.__QURAN_THEME__ = theme;
}

function flashThemeTransition() {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("theme-transitioning");
  window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 320);
}

type ThemeContextValue = {
  theme: ColorScheme;
  setTheme: (theme: ColorScheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ColorScheme>(() => readStoredTheme());

  useLayoutEffect(() => {
    applyColorScheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: ColorScheme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    flashThemeTransition();
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
      flashThemeTransition();
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}