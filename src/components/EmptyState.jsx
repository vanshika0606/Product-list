function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <div>
        <p className="font-medium text-slate-800">No products match your filters.</p>
        <p className="text-sm text-slate-500 mt-1">Try adjusting or clearing your filters to see more results.</p>
      </div>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default EmptyState
