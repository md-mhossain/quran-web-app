"use client";

import { SearchResult } from "@/types";
import Ayah from "@/components/ayah/Ayah";

type Props = {
  results: SearchResult[];
  onClose: () => void;
};

export default function AyahList({ results, onClose }: Props) {
  if (!results.length) {
    return (
      <div className="flex items-center justify-center px-4 py-8 sm:py-10">
        <p className="text-center text-sm text-muted">
          No results found
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        max-h-[50vh]
        sm:max-h-96
        overflow-y-auto
        divide-y
        divide-accent
        rounded-xl
      "
    >
      {results.map((ayah) => (
        <Ayah
          key={`${ayah.surahId}-${ayah.ayahNumber}`}
          ayah={ayah}
          onClose={onClose}
        />
      ))}
    </div>
  );
}