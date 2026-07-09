import { getStarFillPercent } from '../utilities/rating.js'

function StarRating({ rating = 0 }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="inline-flex text-amber-400">
        {stars.map((star) => {
          const fillPercent = getStarFillPercent(rating, star)
          return (
            <span key={star} className="relative inline-block w-4 h-4">
              <svg viewBox="0 0 20 20" fill="#e2e8f0" className="absolute inset-0 w-4 h-4">
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
              </svg>
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
                </svg>
              </span>
            </span>
          )
        })}
      </span>
      <span className="text-slate-500">({rating.toFixed(1)})</span>
    </span>
  )
}

export default StarRating
