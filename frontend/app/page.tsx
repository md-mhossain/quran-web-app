import { fetchSurahById, fetchSurahList } from "@/lib/api";
import SurahDetails from "@/components/surah/SurahDetails";
import MasterLayout from "@/components/layout/MasterLayout";


export default async function Home() {
  // We hardcode ID 1 to serve as the default content for the homepage
  const initialSurahId = 1;

  const [listRes, result] = await Promise.all([
    fetchSurahList(),
    fetchSurahById(initialSurahId),
  ]);

  const surahs = listRes.data ?? [];
  

  // Error handling if the API call fails
  if (!result.status || !result.data) {
    return (
      <MasterLayout surahs={surahs} currentSurahId={initialSurahId}>
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-sm font-medium text-red-400/90">
            Failed to load initial Surah
          </p>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout surahs={surahs} currentSurahId={result.data.id}>
      <SurahDetails surah={result.data} />
    </MasterLayout>
  );
}