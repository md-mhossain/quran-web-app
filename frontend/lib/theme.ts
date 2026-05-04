export const THEME_STORAGE_KEY = "quran-theme";

export type ColorScheme = "light" | "dark";

/** Runs synchronously before React so localStorage theme applies without a flash. */
export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var v=localStorage.getItem(k);var dark=v==="dark";document.documentElement.classList.toggle("dark",dark);window.__QURAN_THEME__=dark?"dark":"light";}catch(e){document.documentElement.classList.remove("dark");window.__QURAN_THEME__="light";}})();`;
