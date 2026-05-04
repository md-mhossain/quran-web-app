export default function SuraListSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 lg:py-14">
      <div className="mb-8 md:mb-10 space-y-3 animate-pulse">
        <div className="h-3 w-24 rounded-full bg-[var(--color-surface-alt)]" />
        <div className="h-8 w-56 rounded-lg bg-[var(--color-surface-alt)]" />
        <div className="h-4 max-w-xl rounded-lg bg-[var(--color-surface-alt)]" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[var(--reader-radius)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 md:px-5 md:py-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-4">
                <div className="h-11 w-11 shrink-0 rotate-45 rounded-lg bg-[var(--color-surface-alt)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 rounded-md bg-[var(--color-surface-alt)]" />
                  <div className="h-3 w-28 rounded-md bg-[var(--color-surface-alt)]" />
                </div>
              </div>
              <div className="max-w-[42%] space-y-2 text-right">
                <div className="ml-auto h-5 w-24 rounded-md bg-[var(--color-surface-alt)]" />
                <div className="ml-auto h-3 w-16 rounded-md bg-[var(--color-surface-alt)]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
