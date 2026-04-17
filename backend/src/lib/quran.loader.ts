import { Surah } from "../types";
import { CONFIG } from '../config/index';


// const data_url = CONFIG.DATA_URL || "";

let cache: Surah[] = [];

export const initQuran = async () => {
  console.log("Loading Quran at server startup...");

  const res = await fetch("https://raw.githubusercontent.com/risan/quran-json/master/dist/quran_en.json");
  cache = (await res.json()) as Surah[];

  console.log("Quran loaded:", cache.length);
};

export const loadQuran = (): Surah[] => {
  if (!cache) {
    throw new Error("Quran not initialized. Call initQuran first.");
  }

  return cache;
};