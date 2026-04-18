"use client";

import { Settings, defaultSettings } from "@/types";

import { createContext, useContext, useEffect, useState } from "react";

type SettingsContextType = {
  settings: Settings;
  setSettings: (val: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaultSettings;

    const stored = localStorage.getItem("quran-settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  // persist only (NO extra state)
  useEffect(() => {
    localStorage.setItem("quran-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;

    // Font sizes
    root.style.setProperty("--arabic-size", `${settings.arabicSize}px`);

    root.style.setProperty(
      "--translation-size",
      `${settings.translationSize}px`,
    );
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
