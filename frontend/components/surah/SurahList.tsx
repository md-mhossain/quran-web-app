import { Surah } from "@/types";
import SurahCard from "./SurahCard";

export default async function SuraList({ surahs }: { surahs: Surah[] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 lg:py-14">
      <div className="mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Browse
        </p>
        <h2 className="mt-2 font-inter text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          All Surahs
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
          Pick a surah from the list or use the rail on larger screens—your reader opens with typography tuned in Settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {surahs?.map((surah) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </div>
    </div>
  );
}
