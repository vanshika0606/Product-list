import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllProducts()
      setProducts(data)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadProducts} />}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  )
}

export default ProductListing
