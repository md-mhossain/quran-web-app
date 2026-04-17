export interface Settings {
  arabicFont: "amiri" | "noto";
  arabicFontSize: number;
  translationFontSize: number;
}

export const defaultSettings: Settings = {
  arabicFont: "amiri",
  arabicFontSize: 28,
  translationFontSize: 16,
};