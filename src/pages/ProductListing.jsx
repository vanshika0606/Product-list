import { useState } from 'react'
import { useProducts } from '../hooks/useProducts.js'
import { useProductFilters, PAGE_SIZE } from '../hooks/useProductFilters.js'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import SkeletonGrid from '../components/SkeletonGrid.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import EmptyState from '../components/EmptyState.jsx'

function ProductListing() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { products, categories, loading, error, reload } = useProducts()
  const {
    brands,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    currentPage,
    totalPages,
    pageProducts,
    filteredCount,
    toggleCategory,
    toggleBrand,
    applyPriceRange,
    clearFilters,
    goToPage,
  } = useProductFilters(products)

  return (
    <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
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
        {loading && <SkeletonGrid count={PAGE_SIZE} />}
        {!loading && error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && filteredCount === 0 && (
          <EmptyState onClearFilters={clearFilters} />
        )}
        {!loading && !error && filteredCount > 0 && (
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
