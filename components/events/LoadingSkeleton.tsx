export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden animate-pulse">
      {/* Image area */}
      <div className="aspect-16/10 bg-gray-100" />
      <div className="p-5">
        {/* Date badge + category pill */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-5 w-14 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-100 rounded-full" />
        </div>
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        {/* Description */}
        <div className="h-4 bg-gray-100 rounded w-full mb-1" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
        {/* Meta row */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-gray-100 rounded" />
          <div className="h-4 w-20 bg-gray-100 rounded" />
          <div className="h-4 w-28 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  )
}

export function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-5 animate-pulse">
      <div className="space-y-4">
        <div className="h-7 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
