import { fetchSurahList } from "@/lib/api";
import SurahCard from "./SurahCard";

export default async function SuraList() {
  const result = await fetchSurahList();
  const data = result?.data;

  return (
    <div className="py-8 lg:py-12 container mx-auto px-4 md:px-6 lg:px-8 2xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((surah) => (
        <SurahCard key={surah.id} surah={surah} />
      ))}
    </div>
  );
}