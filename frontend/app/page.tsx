import MasterLayout from "@/components/layout/MasterLayout";
import SuraList from "@/components/surah/SurahList";
import { fetchSurahList } from "@/lib/api";

export default async function Home() {

  const res = await fetchSurahList();

  if (!res.status || !res.data) {
    return (
      <MasterLayout>
        <div className="text-center py-20 text-red-500">
          Failed to load Surah list
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <SuraList surahs={res.data} />
    </MasterLayout>
  );
}
