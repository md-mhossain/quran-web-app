"use client";

import { searchAyahs } from "@/lib/api";
import { SearchResult } from "@/types";
import { useState } from "react";

export default function SearchModal({ onClose }: { onClose: () => void }) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  console.log("Search query:", query);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const result = await searchAyahs(value);
      setResults(result?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl mx-4 rounded-2xl border border-white/10 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* input */}
        <div className="p-4 flex items-center gap-2">
          🔍
          <input
            autoFocus
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search ayah by keyword, e.g. mercy, light, etc."
          />
        </div>

        {/* results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && <p className="p-4 text-sm">Searching...</p>}

          {!loading && results.length === 0 && query && (
            <p className="p-4 text-sm">No results found</p>
          )}

          {results.map((ayah) => (
            <div key={ayah.surahId} className="p-3 hover:bg-gray-100">
              {ayah.surahName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}