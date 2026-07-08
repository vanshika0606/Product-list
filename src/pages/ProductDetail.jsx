import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products.js'
import StarRating from '../components/StarRating.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [id])

  async function loadProduct() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProductById(id)
      setProduct(data)
    } catch (err) {
      setError('Failed to load product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={loadProduct} />
  if (!product) return null

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1.5 rounded-md border bg-white text-sm text-slate-700 self-start"
      >
        ← Back
      </button>

      <div className="bg-white flex-1 rounded-lg shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-64 sm:max-h-96 object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">{product.title}</h1>
          <p className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900">${product.price}</p>
          <div className="mt-2 text-lg">
            <StarRating rating={product.rating} />
          </div>

          <p className="mt-4 text-base text-slate-600">
            <span className="font-medium text-slate-800">Brand:</span> {product.brand}
          </p>
          <p className="text-base text-slate-600 capitalize">
            <span className="font-medium text-slate-800">Category:</span>{' '}
            {product.category?.replace(/-/g, ' ')}
          </p>

          <div className="mt-6 pt-5 border-t">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Description</h2>
            <p className="text-base text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {product.reviews?.length > 0 && (
            <div className="mt-6 pt-5 border-t">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Reviews</h2>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-base text-slate-800">
                        {review.reviewerName}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-base text-slate-600 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
