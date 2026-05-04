import SuraDetailSkeleton from "@/skeleton/SuraDetailSkeleton";
import MasterLayout from "@/components/layout/MasterLayout";

export default function Loading() {
  return (
    <MasterLayout surahs={[]}>
      <SuraDetailSkeleton />
    </MasterLayout>
  );
}
