export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden animate-pulse rounded-xl shadow-sm bg-white">
      {/* Image Placeholder */}
      <div className="bg-gray-200 w-full h-52 rounded-t-xl"></div>

      {/* Content Placeholder */}
      <div className="px-4 py-3 flex flex-col gap-3">
        {/* Title */}
        <div className="bg-gray-200 h-5 w-3/4 rounded"></div>

        {/* Price + Badge / Button */}
        <div className="flex justify-between items-center mt-2">
          <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/6 rounded"></div>
        </div>

        {/* Optional secondary line */}
        <div className="bg-gray-200 h-3 w-1/2 rounded mt-1"></div>
      </div>
    </div>
  )
}
