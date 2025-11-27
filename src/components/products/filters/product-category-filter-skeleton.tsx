export function CategoryFilterSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Title */}
      <div className="h-5 w-32 bg-gray-200 rounded"></div>

      {/* Badges */}
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-6 w-20 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    </div>
  )
}
