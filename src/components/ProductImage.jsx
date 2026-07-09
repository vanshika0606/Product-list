import { useEffect, useState, useRef } from 'react'

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">' +
    '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
    '<circle cx="8.5" cy="8.5" r="1.5"/>' +
    '<path d="M21 15l-5-5L5 21" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>',
  )

function ProductImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);

    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);


  return (
    <div className={`relative overflow-hidden bg-slate-50 ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}
      <img
        ref={imgRef}
        src={errored ? FALLBACK_IMAGE : src}
        alt={alt}
        decoding="async"
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => setErrored(true)}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'
          } ${errored ? 'p-8' : ''}`}
      />
    </div>
  )
}

export default ProductImage
