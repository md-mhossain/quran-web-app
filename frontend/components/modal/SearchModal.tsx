"use client";

import { searchAyahs } from "@/lib/api";
import { SearchResult } from "@/types";
import { useEffect, useRef, useState } from "react";
import AyahList from "@/components/ayah/AyahList";
import AyahSkeleton from "@/skeleton/AyahSkeleton";

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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // reset state for empty / short query
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    // INSTANT CACHE (Google-style feel)
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

        // ignore old responses (race safety)
        if (currentRequestId !== requestIdRef.current) return;

        const data = result?.data || [];

        // save to cache
        cacheRef.current.set(trimmed, data);

        setResults(data);
      } catch (err: unknown) {
        console.error("Search error:", err);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 200); // faster debounce = instant feel
  };

  // ESC close support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-white to-gray-50 px-6 pt-6 pb-4 border-b border-gray-200">

          <p className="text-xs text-gray-500 mb-3">
            Search Quran • Surah & Ayah
          </p>

          {/* INPUT */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
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

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-2 p-2">
              <AyahSkeleton />
              <AyahSkeleton />
              <AyahSkeleton />
            </div>
          )}

          {/* Empty state */}
          {!loading && results.length === 0 && query.trim().length >= 2 && (
            <div className="p-6 text-sm text-gray-400 text-center">
              No results found for{" "}
              <span className="font-medium text-gray-600">{query}</span>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="bg-white mx-3 my-3 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <AyahList results={results} onClose={onClose} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}