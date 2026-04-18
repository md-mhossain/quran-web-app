export interface Settings {
  font: string;
  arabicSize: number;
  translationSize: number;
};

export const defaultSettings: Settings = {
  font: "amiri",
  arabicSize: 28,
  translationSize: 16,
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
  surahTransliteration: string;
  surahTranslation: string;
  ayahNumber: number;
  arabic: string;
  translation: string;
};

export interface ApiResponse<T> {
  status: boolean;
  statusCode?: number;
  count?: number;
  message: string;
  data?: T;
}
