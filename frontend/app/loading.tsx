import MasterLayout from "@/components/layout/MasterLayout";
import SuraListSkeleton from "@/skeleton/SuraListSkeleton";

const loading = () => {
    return (
        <MasterLayout>
            <SuraListSkeleton />
        </MasterLayout>
    );
};

export default loading;