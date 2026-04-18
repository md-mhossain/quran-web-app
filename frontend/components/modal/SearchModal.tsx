"use client";

import { searchAyahs } from "@/lib/api";
import { SearchResult } from "@/types";
import { useRef, useState } from "react";
import AyahList from "@/components/ayah/AyahList";
import Ayah from "../ayah/Ayah";
import AyahSkeleton from "@/skeleton/AyahSkeleton";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handleSearch = async (value: string) => {
    setQuery(value);

    // clear results if empty
    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // cancel previous request safely
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);

      const result = await searchAyahs(value, {
        signal: controller.signal,
      });

      setResults(result?.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // 👇 silently ignore abort error (IMPORTANT)
        if (err.name === "AbortError") return;

        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

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

          {loading && (
            <div className="p-6 text-sm text-gray-500">
              <AyahSkeleton />
              <AyahSkeleton />
              <AyahSkeleton />
            </div>
          )}

          {!loading && results.length === 0 && query && (
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
      </div>
    </div>
  );
}