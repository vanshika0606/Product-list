import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating.jsx'
import ProductImage from './ProductImage.jsx'

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg shadow-sm p-3 sm:p-4 text-left hover:shadow-md transition-shadow flex flex-col"
    >
      <ProductImage
        src={product.thumbnail}
        alt={product.title}
        className="h-28 sm:h-40 w-full mb-3 sm:mb-4"
      />
      <div className="border-t pt-3">
        <h3 className="font-medium text-slate-800 truncate">{product.title}</h3>
        <p className="mt-1 font-semibold text-slate-900">${product.price}</p>
        <div className="mt-1">
          <StarRating rating={product.rating} />
        </div>
      </div>
    </button>
  )
}

export default ProductCard
