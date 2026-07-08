import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllProducts, fetchCategories } from '../api/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

const PAGE_SIZE = 8

function ProductListing() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const selectedCategories = searchParams.get('category')?.split(',').filter(Boolean) || []
  const selectedBrands = searchParams.get('brand')?.split(',').filter(Boolean) || []
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const brands = useMemo(() => {
    const unique = new Set(products.map((product) => product.brand).filter(Boolean))
    return Array.from(unique).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) {
        return false
      }
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) {
        return false
      }
      if (minPrice && product.price < Number(minPrice)) {
        return false
      }
      if (maxPrice && product.price > Number(maxPrice)) {
        return false
      }
      return true
    })
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice])

  function updateParams(updates, { resetPage = true } = {}) {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    if (resetPage) {
      params.delete('page')
    }
    setSearchParams(params)
  }

  function goToPage(page) {
    updateParams({ page }, { resetPage: false })
  }

  function toggleCategory(category) {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    updateParams({ category: next.join(',') })
  }

  function toggleBrand(brand) {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    updateParams({ brand: next.join(',') })
  }

  function applyPriceRange(min, max) {
    updateParams({ minPrice: min, maxPrice: max })
  }

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <div className="mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
      <button
        onClick={() => setFiltersOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-md border bg-white text-sm text-slate-700 shadow-sm self-start"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
        </svg>
        Filters
      </button>

      <FilterSidebar
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        categories={categories}
        brands={brands}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onToggleCategory={toggleCategory}
        onToggleBrand={toggleBrand}
        onApplyPriceRange={applyPriceRange}
      />

      <div className="flex-1 min-w-0">
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} onRetry={loadData} />}
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
    </div>
  )
}

export default ProductListing
