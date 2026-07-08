import { useState } from 'react'

function FilterSidebar({
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

  function handleApply() {
    onApplyPriceRange(minInput, maxInput)
  }

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-lg shadow-sm p-4 space-y-6">
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
  )
}

export default FilterSidebar
