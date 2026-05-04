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
      className="group block px-5 py-4 transition-colors duration-200 hover:bg-[var(--color-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--color-secondary)]">
            {ayah.surahTransliteration}
          </h3>

          <p
            dir="rtl"
            className="mt-1 truncate font-[family-name:var(--arabic-font-family)] text-[15px] leading-relaxed text-[var(--color-text-secondary)]"
          >
            {ayah.surahName}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-2.5 py-1 text-xs font-semibold tabular-nums text-[var(--color-text-secondary)]">
          {ayah.ayahNumber}
        </span>
      </div>

      <div className="mt-4 text-right">
        <p className="arabic-text text-[var(--foreground)]">{ayah.arabic}</p>
      </div>

      <p className="translation-text mt-3 text-[var(--color-text-secondary)] leading-relaxed">
        {ayah.translation}
      </p>
    </Link>
  );
}
