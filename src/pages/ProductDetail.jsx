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
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1.5 rounded-md border bg-white text-sm text-slate-700"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-64 sm:max-h-96 object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{product.title}</h1>
          <p className="mt-2 text-xl font-semibold text-slate-900">${product.price}</p>
          <div className="mt-1">
            <StarRating rating={product.rating} />
          </div>

          <p className="mt-3 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Brand:</span> {product.brand}
          </p>
          <p className="text-sm text-slate-600 capitalize">
            <span className="font-medium text-slate-800">Category:</span>{' '}
            {product.category?.replace(/-/g, ' ')}
          </p>

          <div className="mt-5 pt-4 border-t">
            <h2 className="font-semibold text-slate-800 mb-2">Description</h2>
            <p className="text-sm text-slate-600">{product.description}</p>
          </div>

          {product.reviews?.length > 0 && (
            <div className="mt-5 pt-4 border-t">
              <h2 className="font-semibold text-slate-800 mb-3">Reviews</h2>
              <div className="space-y-3">
                {product.reviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-800">
                        {review.reviewerName}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{review.comment}</p>
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
