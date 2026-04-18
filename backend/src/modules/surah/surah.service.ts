
import { SearchResult, Surah } from "../../types";
import { loadQuran } from "../../lib/quran.loader"; 

// Implementation for getting all surah
export const getAllSurah = async (): Promise<Surah[]> => {
  const quran = await loadQuran();

  if (!Array.isArray(quran)) {
    throw new Error("Invalid Quran data format");
  }

  return quran;
};

// Implementation for getting a surah by ID
export const getSurahById = async (
  id: number
): Promise<Surah> => {
  const quran = await loadQuran();

  if (!Array.isArray(quran)) {
    throw new Error("Invalid Quran data format");
  }

  const surah = quran.find((s) => s.id === id);

  if (!surah) {
    throw new Error("Surah not found");
  }

  return surah;
};


export const searchAyahs = async (
  query: string
): Promise<SearchResult[]> => {
  if (!query) {
    throw new Error("Query is required");
  }

  const quran = await loadQuran();
  const results: SearchResult[] = [];

  const q = query.toLowerCase();

  for (const surah of quran) {
    for (const ayah of surah.verses) {
      if (ayah.translation.toLowerCase().includes(q)) {
        results.push({
          surahId: surah.id,
          surahName: surah.name,
          surahTransliteration: surah.transliteration,
          surahTranslation: surah.translation,
          ayahNumber: ayah.id,
          arabic: ayah.text,
          translation: ayah.translation,
        });
      }
    }
  }

  return results;
};
