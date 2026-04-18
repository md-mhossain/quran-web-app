

import { Surah } from "@/types";
import { Bookmark, Share2, Copy, MoreHorizontal } from "lucide-react";


export default function SurahDetails({ surah }: { surah: Surah }) {
  return (
    <div className="container mx-auto bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        
        {/* Top Controls (only translation dropdown style) */}
        <div className="flex justify-center gap-3 mb-6">
          <button className="px-4 py-2 rounded-full bg-white shadow-sm text-sm">
            Translation
          </button>
        </div>

        {/* Arabic Name */}
        <h1 className="text-5xl font-arabic mb-4">{surah?.name}</h1>

        {/* English */}
        <h2 className="text-xl font-semibold text-gray-800">
          {surah?.id}. {surah?.transliteration}
        </h2>

        <p className="text-gray-500 mt-1">The Opener</p>
      </div>

      {/* Ayahs */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {surah?.verses.map((ayah) => (
          <div key={ayah.id} className="py-8 border-b border-gray-300">

            {/* Top Row */}
            <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
              <span>{surah?.id}:{ayah.id}</span>

              <div className="flex items-center gap-4">
                <Bookmark className="w-4 h-4 cursor-pointer hover:text-primary" />
                <Share2 className="w-4 h-4 cursor-pointer hover:text-primary" />
                <Copy className="w-4 h-4 cursor-pointer hover:text-primary" />
                <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Arabic */}
            <p className="text-right text-3xl leading-loose font-arabic mb-6">
              {ayah?.text}
            </p>

            {/* Translation */}
            <p className="text-lg text-gray-800">
              {ayah?.translation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
