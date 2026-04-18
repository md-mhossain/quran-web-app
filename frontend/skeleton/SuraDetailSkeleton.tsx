
export default function SurahDetailSkeleton() {
  return (
    <div className="container mx-auto bg-gray-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <div className="h-9 w-28 bg-gray-200 rounded-full" />
        </div>

        {/* Arabic Name */}
        <div className="h-12 w-60 bg-gray-200 rounded mx-auto mb-4" />

        {/* English Title */}
        <div className="h-5 w-48 bg-gray-200 rounded mx-auto" />

        {/* Subtitle */}
        <div className="h-4 w-32 bg-gray-200 rounded mx-auto mt-2" />
      </div>

      {/* Ayahs */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-10">

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="py-8 border-b border-gray-300"
          >

            {/* Top Row */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-4 w-20 bg-gray-200 rounded" />

              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Arabic Text */}
            <div className="h-6 w-full bg-gray-200 rounded mb-5" />
            <div className="h-6 w-11/12 bg-gray-200 rounded mb-5" />

            {/* Translation */}
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-10/12 bg-gray-200 rounded" />

          </div>
        ))}

      </div>
    </div>
  );
}