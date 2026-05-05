import { fetchSurahById, fetchSurahList } from "@/lib/api";
import SurahDetails from "@/components/surah/SurahDetails";
import MasterLayout from "@/components/layout/MasterLayout";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const listRes = await fetchSurahList();
  const surahs = listRes.data ?? [];

  return surahs.map((surah: { id: number }) => ({
    id: surah.id.toString(),
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  const [listRes, result] = await Promise.all([
    fetchSurahList(),
    fetchSurahById(numericId),
  ]);

  const surahs = listRes.data ?? [];

  if (!result.status || !result.data) {
    return (
      <MasterLayout surahs={surahs} currentSurahId={numericId}>
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-sm font-medium text-red-400/90">
            Failed to load Surah
          </p>
          <p className="mt-2 max-w-md text-sm text-muted">
            The surah may be missing or the service is unreachable.
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