import { Surah } from "@/types";
import { Bookmark, Share2, Copy, MoreHorizontal } from "lucide-react";

export default function SurahDetails({ surah }: { surah: Surah }) {
  return (
    <div className="w-full bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center">

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <button className="px-3 sm:px-4 py-2 rounded-full bg-white shadow-sm text-xs sm:text-sm">
            Translation
          </button>
        </div>

        {/* Arabic Name */}
        <h1 className="arabic-text !text-2xl sm:!text-3xl md:!text-4xl mb-4">
          {surah?.name}
        </h1>

        {/* English Title */}
        <h2 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
          {surah?.id}. {surah?.transliteration}
        </h2>

        <p className="text-gray-500 mt-1 text-xs sm:text-sm">
          The Opener
        </p>
      </div>

      {/* Ayahs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {surah?.verses.map((ayah) => (
          <div
            id={`ayah-${ayah.id}`}
            key={ayah.id}
            className="py-6 sm:py-8 border-b border-gray-300"
          >

            {/* Top Row */}
            <div className="flex items-center justify-between text-gray-500 text-xs sm:text-sm mb-4">
              <span>{surah?.id}:{ayah.id}</span>

              <div className="flex items-center gap-3 sm:gap-4">
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-primary" />
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-primary" />
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-primary" />
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Arabic */}
            <p className="arabic-text !text-lg sm:!text-xl md:!text-2xl mb-6 leading-relaxed text-right">
              {ayah?.text}
            </p>

            {/* Translation */}
            <p className="translation-text !text-sm sm:!text-base md:!text-lg text-gray-800 leading-relaxed">
              {ayah?.translation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}