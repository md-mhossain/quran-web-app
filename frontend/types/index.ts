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


export interface Ayah {
  id: number;
  text: string;
  translation: string;
};

export interface Surah {
  id: number;
  name: string;
  total_verses: number
  transliteration: string;
  translation: string;
  verses: Ayah[];
};


export interface SearchResult {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  arabic: string;
  translation: string;
}

export interface ApiResponse<T> {
  status: boolean;
  statusCode?: number;
  count?: number;
  message: string;
  data?: T;
}
