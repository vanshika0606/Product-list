const DOTS = '...'

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function getPageItems(currentPage, totalPages, siblingCount = 1) {
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2)
    return [...leftRange, DOTS, totalPages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(totalPages - (3 + siblingCount * 2) + 1, totalPages)
    return [1, DOTS, ...rightRange]
  }

  return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, totalPages]
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pageItems = getPageItems(currentPage, totalPages)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2.5 sm:px-3 py-2 rounded-md border bg-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      {pageItems.map((item, index) =>
        item === DOTS ? (
          <span
            key={`dots-${index}`}
            className="w-9 h-9 shrink-0 flex items-center justify-center text-sm text-slate-400"
          >
            {DOTS}
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-9 h-9 shrink-0 rounded-md text-sm border ${
              item === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700'
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2.5 sm:px-3 py-2 rounded-md border bg-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
