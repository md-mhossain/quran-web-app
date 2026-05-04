export default function AyahSkeleton() {
  return (
    <div className="block animate-pulse rounded-xl border border-accent px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 w-36 rounded-md bg-bg-secondary" />
          <div className="h-3 w-28 rounded-md bg-bg-secondary" />
        </div>
        <div className="h-7 w-10 rounded-full bg-bg-secondary" />
      </div>

      <div className="mt-4 space-y-2 text-right">
        <div className="ml-auto h-5 w-full rounded-md bg-bg-secondary" />
        <div className="ml-auto h-5 w-[92%] rounded-md bg-bg-secondary" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-md bg-bg-secondary" />
        <div className="h-4 w-[92%] rounded-md bg-bg-secondary" />
      </div>
    </div>
  );
}
