import { Surah } from "../types";

const data_url = process.env.data_url || "";

let cache: Surah[] = [];

export const initQuran = async () => {
  console.log("Loading Quran at server startup...");

  const res = await fetch(data_url);
  cache = (await res.json()) as Surah[];

  console.log("Quran loaded:", cache.length);
};

export const loadQuran = () => {
  return cache;
};