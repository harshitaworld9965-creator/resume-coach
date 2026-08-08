function SkeletonBlock({ className }) {
  return (
    <div
      className={`bg-gray-800 rounded-xl animate-pulse ${className}`}
    />
  )
}

export function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-7">

      {/* Score badge skeleton */}
      <SkeletonBlock className="h-24 w-full" />

      {/* Summary skeleton */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-4 w-3/5" />
      </div>

      {/* Skills skeleton */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-3 w-28" />
        <div className="flex gap-2 flex-wrap">
          <SkeletonBlock className="h-6 w-16 rounded-full" />
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-6 w-14 rounded-full" />
          <SkeletonBlock className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Missing skills skeleton */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-3 w-28" />
        <div className="flex gap-2 flex-wrap">
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-6 w-16 rounded-full" />
          <SkeletonBlock className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Rewrite cards skeleton */}
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-3 w-36" />
        <SkeletonBlock className="h-28 w-full" />
        <SkeletonBlock className="h-28 w-full" />
      </div>

    </div>
  )
}