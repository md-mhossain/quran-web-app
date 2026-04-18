import Link from "next/link";
import { Surah } from "@/types";

export default function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link href={`/surah/${surah.id}`}>
      <div className="group relative flex items-center justify-between p-5 rounded-md border border-gray-200 bg-white/80 hover:bg-gray-50 backdrop-blur-sm hover:shadow hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

        {/* Left Side */}
        <div className="flex items-center gap-4 relative z-10">
          
          {/* Number Badge */}
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-bold text-gray-700 group-hover:from-primary group-hover:to-primary/80  transition-all duration-300 shadow-sm">
            {surah?.id}
          </div>

          {/* Text */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition">
              {surah?.transliteration}
            </h2>
      
            <p className="text-sm text-gray-500">
              {surah?.translation}
            </p>
          </div>
        </div>

        {/* Arabic Name */}
        <div className="text-right relative z-10">
          <h3 className="text-sm font-bold text-gray-800 font-arabic group-hover:text-primary transition">
            {surah.name}
          </h3>

          <p className="text-sm text-gray-500">
              {surah?.total_verses ?? 0} Ayahs
            </p>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-primary">
          →
        </div>
      </div>
    </Link>
  );
}