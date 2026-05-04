export type ReadingMode = "translation" | "reading";

export interface Settings {
  font: string;
  arabicSize: number;
  translationSize: number;
  readingMode: ReadingMode;
}

export const defaultSettings: Settings = {
  font: "amiri",
  arabicSize: 28,
  translationSize: 16,
  readingMode: "translation",
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
  type:string
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
