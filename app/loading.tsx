export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-44 bg-gray-200/80 rounded-2xl w-full" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <div className="aspect-square bg-gray-100 rounded-xl w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-10 bg-gray-100 rounded-xl w-full pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
