"use client";

import { SearchResult } from "@/types";
import Link from "next/link";

export default function Ayah({ ayah, onClose }: { ayah: SearchResult; onClose: () => void }) {
  return (
    <Link
    onClick={onClose}
      href={`/surah/${ayah.surahId}#ayah-${ayah.ayahNumber}`}
      className="block group px-5 py-4 border-b border-gray-100 hover:bg-gray-50/60 transition-all duration-200"
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-3">

        <div>
          <h3 className="translation-text font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {ayah.surahTransliteration}
          </h3>

          <p className="arabic-text text-gray-500 mt-0.5">
            {ayah.surahName}
          </p>
        </div>

        {/* ayah badge */}
        <span className="translation-text font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
          {ayah.ayahNumber}
        </span>
      </div>

      {/* Arabic */}
      <div className="mt-4 text-right">
        <p className="arabic-text leading-loose text-gray-900 font-arabic tracking-wide">
          {ayah.arabic}
        </p>
      </div>

      {/* translation */}
      <p className="mt-3 translation-text text-gray-600 leading-relaxed">
        {ayah.translation}
      </p>
    </Link>
  );
}