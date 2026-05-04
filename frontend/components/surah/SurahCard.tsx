import Link from "next/link";
import { Surah } from "@/types";

export default function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link href={`/surah/${surah.id}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[var(--reader-radius)]">
      <div className="relative flex items-center justify-between gap-4 overflow-hidden rounded-[var(--reader-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[color-mix(in_oklab,var(--color-primary)_38%,var(--color-border))] hover:bg-[var(--color-surface-alt)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.26)] md:px-5 md:py-6">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_40%,color-mix(in_oklab,var(--color-primary)_14%,transparent)_65%,transparent)]" />

        <div className="relative z-[1] flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] rotate-45 shadow-inner transition-colors duration-300 group-hover:border-[color-mix(in_oklab,var(--color-primary)_35%,var(--color-border))]">
            <span className="-rotate-45 text-sm font-bold tabular-nums text-[var(--foreground)]">
              {surah?.id}
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-[var(--foreground)]">
              {surah?.transliteration}
            </h2>
            <p className="truncate text-sm text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--foreground)]">
              {surah?.translation}
            </p>
          </div>
        </div>

        <div className="relative z-[1] max-w-[42%] shrink-0 text-right">
          <h3
            dir="rtl"
            className="truncate font-[family-name:var(--arabic-font-family)] text-lg leading-snug text-[var(--foreground)] md:text-xl"
          >
            {surah.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            {(surah?.total_verses ?? 0).toLocaleString()} ayahs
          </p>
        </div>
      </div>
    </Link>
  );
}
