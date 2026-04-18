
export default function SuraListSkeleton() {
  return (
    <div className="py-8 lg:py-12 container mx-auto px-4 md:px-6 lg:px-8 2xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="relative flex items-center justify-between p-5 rounded-md border border-gray-200 bg-white/60 backdrop-blur-sm animate-pulse overflow-hidden"
        >
          {/* Left Side */}
          <div className="flex items-center gap-4">
            
            {/* Number Badge */}
            <div className="w-11 h-11 rounded-xl bg-gray-200" />

            {/* Text */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded ml-auto" />
            <div className="h-3 w-14 bg-gray-200 rounded ml-auto" />
          </div>

          {/* Arrow Placeholder */}
          <div className="absolute right-4 w-4 h-4 bg-gray-200 rounded" />
        </div>
      ))}

    </div>
  );
}
