import { useEffect, useState } from 'react'

function FilterSidebar({
  open,
  onClose,
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  onToggleCategory,
  onToggleBrand,
  onApplyPriceRange,
}) {
  const [minInput, setMinInput] = useState(minPrice ?? '')
  const [maxInput, setMaxInput] = useState(maxPrice ?? '')

  useEffect(() => {
    setMinInput(minPrice ?? '')
    setMaxInput(maxPrice ?? '')
  }, [minPrice, maxPrice])

  function handleApply() {
    onApplyPriceRange(minInput, maxInput)
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed lg:static z-50 lg:z-auto top-0 left-0 h-full lg:h-auto w-72 max-w-[85vw] lg:w-64 lg:max-w-none shrink-0 overflow-y-auto bg-white shadow-lg lg:shadow-sm rounded-none lg:rounded-lg p-4 space-y-6 transition-transform duration-200 ease-in-out lg:transition-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between pb-2 border-b">
          <h2 className="flex items-center gap-2 font-semibold text-slate-800 text-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            Filters
          </h2>
          <button
            aria-label="Close filters"
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm capitalize">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                />
                {category.replace(/-/g, ' ')}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-3">Price Range</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-1/2 border rounded-md px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-1/2 border rounded-md px-2 py-1 text-sm"
            />
          </div>
          <button
            onClick={handleApply}
            className="mt-2 w-full bg-blue-600 text-white rounded-md py-1.5 text-sm"
          >
            Apply
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 mb-3">Brands</h3>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default FilterSidebar
