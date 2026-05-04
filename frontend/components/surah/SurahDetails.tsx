"use client";

import { Surah } from "@/types";
import { useSettings } from "@/context/SettingsContext";
import Image from "next/image";
import AyahToolbar from "../ayah/AyahToolbar";
import { useState } from "react";
import GlobalAudioPlayer from "../audio/GlobalAudioPlayer";

export default function SurahDetails({ surah }: { surah: Surah }) {
  const { settings } = useSettings();

  const [activeAudio, setActiveAudio] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showTranslation = settings.readingMode === "translation";
  const verseCount = surah?.total_verses ?? surah?.verses?.length ?? 0;

  // Helper function to handle changing Ayahs (used by toolbar and player)
  const playAyah = (index: number) => {
    if (!surah.verses[index]) return;

    const sId = String(surah.id).padStart(3, "0");
    const aId = String(index + 1).padStart(3, "0");
    const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sId}${aId}.mp3`;
    const ayahTitle = `${surah.transliteration} : ${index + 1}`;

    setActiveAudio({ url: audioUrl, title: ayahTitle });
    setActiveIndex(index);
  };

  return (
    <div className={`min-h-full ${activeAudio ? "pb-24" : ""}`}>
      <header>
        <div className="px-4 sm:px-5 md:px-6 2xl:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-5 md:py-6">
            {/* LEFT IMAGE */}
            <div className="hidden md:flex justify-start">
              <Image
                src="/makkah.webp"
                alt=""
                width={120}
                height={120}
                priority={surah?.id === 1}
                className="object-contain w-auto h-auto"
              />
            </div>

            {/* CENTER CONTENT */}
            <div className="w-full md:flex-1 text-center">
              <h2 className="font-[family-name:var(--font-inter)] text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-text-secondary">
                Surah {surah?.transliteration}
              </h2>

              <div className="mt-2 flex items-center justify-center flex-wrap gap-x-2 text-muted">
                <span className="text-xs sm:text-sm tracking-[0.18em]">
                  Ayah-
                </span>
                <span className="text-xs sm:text-sm tabular-nums capitalize">
                  {verseCount}, {surah?.type}
                </span>
              </div>
            </div>

            {/* RIGHT NAME */}
            <div className="flex justify-end">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-gray-400 text-right">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* AYAH LIST */}
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mt-3">
        {surah?.verses.map((ayah, index) => (
          <article
            id={`ayah-${ayah.id}`}
            key={ayah.id}
            className="border-b border-accent"
          >
             <div className="flex px-6 md:px-6 2xl:px-10">
                    <span className="text-sm font-medium text-muted" dir="ltr">
                      {surah.id}:{index + 1}
                    </span>
                  </div>
            <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6 py-4 px-4 sm:px-5 md:px-6 2xl:px-8">

              
              {/* TOOLBAR */}
              <AyahToolbar
                arabic={ayah.text}
                translation={ayah.translation}
                showTranslation={showTranslation}
                onPlayClick={() => playAyah(index)}
              />

              {/* CONTENT */}
              <div className="min-w-0 flex-1 flex flex-col gap-5 justify-between h-full">
                {/* ARABIC */}
                <div dir="rtl" className="text-right">

                  <p className="arabic-text text-text-secondary leading-loose">
                    {ayah?.text}
                  </p>
                </div>

                {/* TRANSLATION */}
                {showTranslation && (
                  <div className="pt-4 flex flex-col">
                    <p className="pb-2 text-xs font-normal uppercase tracking-[0.2em] text-muted">
                      Saheeh International
                    </p>

                    <p className="translation-text text-text-secondary">
                      {ayah?.translation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FLOATING AUDIO PLAYER */}
      {activeAudio && (
        <GlobalAudioPlayer
          url={activeAudio.url}
          title={activeAudio.title}
          onClose={() => {
            setActiveAudio(null);
            setActiveIndex(null);
          }}
          onPrevious={
            activeIndex !== null && activeIndex > 0
              ? () => playAyah(activeIndex - 1)
              : undefined
          }
          onNext={
            activeIndex !== null && activeIndex < surah.verses.length - 1
              ? () => playAyah(activeIndex + 1)
              : undefined
          }
        />
      )}
    </div>
  );
}
