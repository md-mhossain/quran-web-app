
export default function AyahSkeleton() {
  return (
    <div className="block px-5 py-4 border-b border-gray-100 animate-pulse">

      {/* top row */}
      <div className="flex items-start justify-between gap-3">

        <div>
          {/* Surah title */}
          <div className="h-4 w-32 bg-gray-200 rounded" />

          {/* Surah name */}
          <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
        </div>

        {/* ayah badge */}
        <div className="h-6 w-8 bg-gray-200 rounded-full" />
      </div>

      {/* Arabic */}
      <div className="mt-4 text-right space-y-2">
        <div className="h-6 w-full bg-gray-200 rounded" />
        <div className="h-6 w-11/12 bg-gray-200 rounded ml-auto" />
      </div>

      {/* translation */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-10/12 bg-gray-200 rounded" />
      </div>

    </div>
  );
}