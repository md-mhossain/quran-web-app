"use client";

import { SearchResult } from "@/types";
import Link from "next/link";

export default function Ayah({
  ayah,
  onClose,
}: {
  ayah: SearchResult;
  onClose: () => void;
}) {
  return (
    <Link
      onClick={onClose}
      href={`/surah/${ayah.surahId}#ayah-${ayah.ayahNumber}`}
      className="group block px-5 py-4"
    >
      <div className="flex items-start justify-between gap-3 bg-background">
        <div className="min-w-0">
          <h3 className="truncate text-muted">
            {ayah.surahTransliteration}
          </h3>

          <p
            dir="rtl"
            className="mt-2 truncate font-[family-name:var(--arabic-font-family)] text-[15px] leading-relaxed text-text-secondary"
          >
            {ayah.surahName}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-accent bg-bg-secondary px-2.5 py-1 text-xs font-semibold tabular-nums text-text-secondary]">
          {ayah.ayahNumber}
        </span>
      </div>

      <div className="mt-4 text-right">
        <p className="arabic-text text-text-secondary">{ayah.arabic}</p>
      </div>

      <p className="translation-text mt-3 text-text-secondary leading-relaxed">
        {ayah.translation}
      </p>
    </Link>
  );
}
