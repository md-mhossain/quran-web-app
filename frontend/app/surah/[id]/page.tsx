import { fetchSurahById } from "@/lib/api";
import SurahDetails from "@/components/surah/SurahDetails";
import { Surah } from "@/types";
import MasterLayout from "@/components/layout/MasterLayout";



type Props = {
    params: Promise<{ id: number }>;
};

export default async function Page({
  params,
}: {
  params: Props["params"];
}) {
  
    
    const { id } = await params;

  console.log("Fetching Surah with ID:", id);

  const result = await fetchSurahById(id);

  if (!result.status || !result.data) {
    return (
      <div className="text-center py-20 text-red-500 flex items-center justify-center">
        Failed to load Surah
      </div>
    );
  }

  const data: Surah = result.data;

  return (
    <MasterLayout>
      <SurahDetails surah={data} />
    </MasterLayout>
  );
}