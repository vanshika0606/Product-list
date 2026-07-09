function SkeletonDetail() {
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6" aria-hidden="true">
      <div className="mb-4 h-8 w-20 rounded-md bg-slate-200 animate-pulse" />

      <div className="bg-white flex-1 rounded-lg shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="flex items-center justify-center">
          <div className="h-80 sm:h-[32rem] w-full rounded bg-slate-200 animate-pulse" />
        </div>

        <div>
          <div className="h-9 sm:h-10 w-3/4 rounded bg-slate-200 animate-pulse" />
          <div className="mt-3 h-7 sm:h-8 w-1/3 rounded bg-slate-200 animate-pulse" />
          <div className="mt-3 h-5 w-32 rounded bg-slate-200 animate-pulse" />

          <div className="mt-4 h-4 w-40 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-36 rounded bg-slate-200 animate-pulse" />

          <div className="mt-6 pt-5 border-t">
            <div className="h-6 w-32 mb-3 rounded bg-slate-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t">
            <div className="h-6 w-28 mb-4 rounded bg-slate-200 animate-pulse" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
                  <div className="mt-2 h-4 w-full rounded bg-slate-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonDetail
