import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllProducts } from '../api/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

const PAGE_SIZE = 8

function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

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

  function goToPage(page) {
    const params = new URLSearchParams(searchParams)
    params.set('page', page)
    setSearchParams(params)
  }

  const totalPages = Math.ceil(products.length / PAGE_SIZE)
  const pageProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadProducts} />}
      {!loading && !error && (
        <>
          <ProductGrid products={pageProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  )
}

export default ProductListing
