"use client";

import { SearchResult } from "@/types";
import Ayah from "@/components/ayah/Ayah";

export default function AyahList({ results, onClose }: { results: SearchResult[]; onClose: () => void }) {
  if (!results.length) {
    return (
      <p className="p-4 text-sm text-gray-500">
        No results found
      </p>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto divide-y mt-5">
      {results?.map((ayah) => (
        <Ayah key={`${ayah.surahId}-${ayah.ayahNumber}`} ayah={ayah} onClose={onClose} />
      ))}
    </div>
  );
}
