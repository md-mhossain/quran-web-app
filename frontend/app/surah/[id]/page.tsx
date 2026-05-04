import { fetchSurahById, fetchSurahList } from "@/lib/api";
import SurahDetails from "@/components/surah/SurahDetails";
import { Surah } from "@/types";
import MasterLayout from "@/components/layout/MasterLayout";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const res = await fetchSurahList();

  if (!res.status || !res.data) return [];

  return res.data.map((surah: Surah) => ({
    id: String(surah.id),
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({
  params,
}: {
  params: Props["params"];
}) {
  const { id } = await params;
  const numericId = Number(id);
  console.log(numericId)

  const [listRes, result] = await Promise.all([
    fetchSurahList(),
    fetchSurahById(numericId),
  ]);

  const surahs = listRes.data ?? [];

  if (!result.status || !result.data) {
    return (
      <MasterLayout surahs={surahs} currentSurahId={numericId}>
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-sm font-medium text-red-400/90">Failed to load Surah</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            The surah may be missing or the service is unreachable.
          </p>
        </div>
      </MasterLayout>
    );
  }

  const data: Surah = result.data;

  return (
    <MasterLayout surahs={surahs} currentSurahId={data.id}>
      <SurahDetails surah={data} />
    </MasterLayout>
  );
}
