import { Surah } from "../types";
import { CONFIG } from '../config/index';


const data_url = CONFIG.DATA_URL || "";

let cache: Surah[] = [];

export const loadQuran = async () => {
  console.log("Loading Quran at server startup...");

  const res = await fetch(data_url);
  cache = (await res.json()) as Surah[];

  return cache;

};

// export const loadQuran = () => {
//   if (!cache) {
//     throw new Error("Quran not initialized. Call initQuran first.");
//   }

//   return cache;
// };