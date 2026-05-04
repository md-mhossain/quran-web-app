"use client";

import { searchAyahs } from "@/lib/api";
import { SearchResult } from "@/types";
import { useEffect, useRef, useState } from "react";
import AyahList from "@/components/ayah/AyahList";
import AyahSkeleton from "@/skeleton/AyahSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);


  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const cacheRef = useRef<Map<string, SearchResult[]>>(new Map());

  const handleSearch = (value: string) => {
    setQuery(value);

    const trimmed = value.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (cacheRef.current.has(trimmed)) {
      setResults(cacheRef.current.get(trimmed)!);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const currentRequestId = ++requestIdRef.current;

      try {
        setLoading(true);

        const result = await searchAyahs(trimmed);

        if (currentRequestId !== requestIdRef.current) return;

        const data = result?.data || [];

        cacheRef.current.set(trimmed, data);

        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP (FIXED + CLICK SAFE) */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* MODAL */}
        <motion.div
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white z-50"
          initial={{ scale: 0.95, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-white to-gray-50 px-6 pt-6 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-3">
              Search Quran • Surah & Ayah
            </p>

            <div className="flex items-center gap-2 border border-gray-200 bg-bg-secondary rounded-xl px-4 py-3 focus-within:ring-0 transition">
              🔍
              <input
                autoFocus
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full outline-none text-sm"
                placeholder="Search: mercy, light, guidance..."
              />
            </div>
          </div>

          {/* RESULTS */}
          <div className="bg-gray-50 max-h-[420px] overflow-y-auto">
            {loading && (
              <div className="space-y-2 p-2">
                <AyahSkeleton />
                <AyahSkeleton />
                <AyahSkeleton />
              </div>
            )}

            {!loading && results.length === 0 && query.trim().length >= 2 && (
              <div className="p-6 text-sm text-gray-400 text-center">
                No results found for{" "}
                <span className="font-medium text-gray-600">{query}</span>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="bg-white mx-3 my-3 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <AyahList results={results} onClose={onClose} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}