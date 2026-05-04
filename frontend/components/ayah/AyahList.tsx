"use client";

import { SearchResult } from "@/types";
import Ayah from "@/components/ayah/Ayah";

export default function AyahList({
  results,
  onClose,
}: {
  results: SearchResult[];
  onClose: () => void;
}) {
  if (!results.length) {
    return (
      <p className="p-5 text-sm text-[var(--color-muted)]">
        No results found
      </p>
    );
  }

  return (
    <div className="max-h-80 divide-y divide-[var(--color-border)] overflow-y-auto">
      {results?.map((ayah) => (
        <Ayah key={`${ayah.surahId}-${ayah.ayahNumber}`} ayah={ayah} onClose={onClose} />
      ))}
    </div>
  );
}
