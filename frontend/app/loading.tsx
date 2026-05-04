import MasterLayout from "@/components/layout/MasterLayout";
import SuraDetailSkeleton from "@/skeleton/SuraDetailSkeleton";

export default function Loading() {
  return (
    <MasterLayout surahs={[]}>
      <SuraDetailSkeleton />
    </MasterLayout>
  );
}
