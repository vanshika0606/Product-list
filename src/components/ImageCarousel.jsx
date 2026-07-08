import { useEffect, useState } from 'react'

function ImageCarousel({ images, alt }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    images?.forEach((src) => {
      const preload = new Image()
      preload.src = src
    })
  }, [images])

  if (!images || images.length === 0) return null

  const hasMultiple = images.length > 1

  function showPrevious() {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }

  function showNext() {
    setIndex((current) => (current + 1) % images.length)
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative w-full flex items-center justify-center">
        {hasMultiple && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={showPrevious}
            className="absolute left-0 z-10 p-1.5 rounded-full bg-white shadow border text-slate-600 hover:text-slate-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <img
          src={images[index]}
          alt={`${alt} - image ${index + 1}`}
          className="max-h-80 sm:max-h-[32rem] w-full object-contain"
        />

        {hasMultiple && (
          <button
            type="button"
            aria-label="Next image"
            onClick={showNext}
            className="absolute right-0 z-10 p-1.5 rounded-full bg-white shadow border text-slate-600 hover:text-slate-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {hasMultiple && (
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
