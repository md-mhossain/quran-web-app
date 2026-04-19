"use client";

import { Settings, defaultSettings } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type SettingsContextType = {
  settings: Settings;
  setSettings: (val: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  
  // Lazy init (runs only on client, safe)
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("quran-settings");
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Persist
  useEffect(() => {
    localStorage.setItem("quran-settings", JSON.stringify(settings));
  }, [settings]);

  // Apply CSS variables
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--arabic-font-size", `${settings.arabicSize}px`);
    root.style.setProperty("--translation-font-size", `${settings.translationSize}px`);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside Provider");
  return ctx;
};