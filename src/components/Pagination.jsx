import { DOTS, getPageItems } from '../utilities/pagination.js'

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
