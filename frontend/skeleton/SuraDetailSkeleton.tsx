export default function SurahDetailSkeleton() {
  return (
    <div className="min-h-full animate-pulse bg-[var(--background)]">
      
      {/* HEADER SKELETON */}
      <header className="px-4 sm:px-5 md:px-6 2xl:px-8 py-6 md:py-8 border-b border-accent">
        <div className="flex items-center justify-between gap-4">

          {/* LEFT IMAGE */}
          <div className="hidden md:block w-[120px]">
            <div className="h-[120px] w-[120px] rounded-xl bg-bg-secondary" />
          </div>

          {/* CENTER */}
          <div className="flex-1 text-center space-y-3">
            <div className="h-4 w-32 mx-auto rounded bg-bg-secondary" />
            <div className="h-6 w-48 mx-auto rounded bg-bg-secondary" />
            <div className="h-4 w-40 mx-auto rounded bg-bg-secondary" />
          </div>

          {/* RIGHT */}
          <div className="hidden md:block w-[120px]">
            <div className="h-5 w-full rounded bg-bg-secondary" />
          </div>
        </div>
      </header>

      {/* AYAH LIST */}
      <div className="flex flex-col">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-accent px-4 sm:px-5 md:px-6 2xl:px-8 py-5"
          >
            <div className="flex gap-4 md:gap-6">

              {/* TOOLBAR */}
              <div className="flex flex-col items-center gap-3 w-[52px]">
                <div className="h-8 w-8 rounded-full bg-bg-secondary" />
                <div className="h-8 w-8 rounded-full bg-bg-secondary" />
                <div className="h-8 w-8 rounded-full bg-bg-secondary" />
                <div className="h-8 w-8 rounded-full bg-bg-secondary" />
              </div>

              {/* CONTENT */}
              <div className="flex-1 space-y-5">

                {/* ARABIC */}
                <div className="space-y-3 text-right">
                  <div className="h-6 w-full rounded bg-bg-secondary" />
                  <div className="h-6 w-[92%] ml-auto rounded bg-bg-secondary" />
                  <div className="h-6 w-[85%] ml-auto rounded bg-bg-secondary" />
                </div>

                {/* TRANSLATION */}
                <div className="space-y-3 border-t border-accent pt-4">
                  <div className="h-3 w-40 rounded bg-bg-secondary" />
                  <div className="h-4 w-full rounded bg-bg-secondary" />
                  <div className="h-4 w-[90%] rounded bg-bg-secondary" />
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}