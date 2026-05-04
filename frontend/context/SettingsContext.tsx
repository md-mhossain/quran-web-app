"use client";

import { Settings, defaultSettings } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type SettingsContextType = {
  settings: Settings;
  setSettings: (val: Settings) => void;
};

const STORAGE_KEY = "quran-settings";

const SettingsContext = createContext<SettingsContextType | null>(
  null
);

/* ---------- Snapshot Cache ---------- */
let cachedSettings: Settings = defaultSettings;

function readSettings(): Settings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      cachedSettings = defaultSettings;
      return cachedSettings;
    }

    const parsed = JSON.parse(stored) as Partial<Settings>;

    const nextSettings = {
      ...defaultSettings,
      ...parsed,
    };

    // Return cached object if unchanged
    if (
      JSON.stringify(nextSettings) ===
      JSON.stringify(cachedSettings)
    ) {
      return cachedSettings;
    }

    cachedSettings = nextSettings;
    return cachedSettings;
  } catch {
    return cachedSettings;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = useSyncExternalStore(
    subscribe,
    readSettings,
    () => defaultSettings
  );

  const setSettings = (val: Settings) => {
    cachedSettings = val;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(val)
    );

    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty(
      "--arabic-font-size",
      `${settings.arabicSize}px`
    );

    root.style.setProperty(
      "--translation-font-size",
      `${settings.translationSize}px`
    );

    root.style.setProperty(
      "--arabic-font-family",
      settings.font === "amiri"
        ? 'var(--font-amiri), "Amiri", serif'
        : 'var(--font-scheherazade), "Scheherazade New", serif'
    );
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    throw new Error(
      "useSettings must be used inside Provider"
    );
  }

  return ctx;
};