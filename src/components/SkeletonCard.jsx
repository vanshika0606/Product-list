function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-col" aria-hidden="true">
      <div className="h-28 sm:h-40 mb-3 sm:mb-4 rounded bg-slate-200 animate-pulse" />
      <div className="border-t pt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-slate-200 animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
      </div>
    </div>
  )
}

export default SkeletonCard
