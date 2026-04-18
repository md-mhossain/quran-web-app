import { fetchSurahById, fetchSurahList } from "@/lib/api";
import SurahDetails from "@/components/surah/SurahDetails";
import { Surah } from "@/types";
import MasterLayout from "@/components/layout/MasterLayout";


// Force SSG
export const dynamic = "force-static";

// Generate all static routes at build time
export async function generateStaticParams() {
  const res = await fetchSurahList();

  if (!res.status || !res.data) return [];

  return res.data.map((surah: Surah) => ({
    id: String(surah.id),
  }));
}



type Props = {
    params: Promise<{ id: number }>;
};

export default async function Page({
  params,
}: {
  params: Props["params"];
}) {
  
    
    const { id } = await params;


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