export interface Ayah {
  id: number;
  text: string;
  translation: string;
};

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  verses: Ayah[];
};


export interface ApiResponse<T> {
  status: boolean;
  statusCode?: number;
  message: string;
  data?: T;
}


export interface SearchResult {
  surahId: number;
  surahName: string;
  surahTransliteration: string;
  surahTranslation: string;
  ayahNumber: number;
  arabic: string;
  translation: string;
};