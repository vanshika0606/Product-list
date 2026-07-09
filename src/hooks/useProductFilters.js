import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../utilities/constants.js'
import { getTotalPages, matchesFilters, paginate, parseListParam, toggleListValue } from '../utilities/filterLogic.js'

export { PAGE_SIZE }

export function useProductFilters(products) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const categoryParam = searchParams.get('category')
  const brandParam = searchParams.get('brand')
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const selectedCategories = useMemo(() => parseListParam(categoryParam), [categoryParam])
  const selectedBrands = useMemo(() => parseListParam(brandParam), [brandParam])

  const brands = useMemo(() => {
    const unique = new Set(products.map((product) => product.brand).filter(Boolean))
    return Array.from(unique).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    const categorySet = new Set(selectedCategories)
    const brandSet = new Set(selectedBrands)
    const min = minPrice ? Number(minPrice) : null
    const max = maxPrice ? Number(maxPrice) : null
    return products.filter((product) => matchesFilters(product, { categorySet, brandSet, min, max }))
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice])

  const totalPages = getTotalPages(filteredProducts.length, PAGE_SIZE)
  const pageProducts = paginate(filteredProducts, currentPage, PAGE_SIZE)

  const updateParams = useCallback(
    (updates, { resetPage = true } = {}) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
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
        return params
      })
    },
    [setSearchParams],
  )

  const goToPage = useCallback(
    (page) => updateParams({ page }, { resetPage: false }),
    [updateParams],
  )

  const toggleCategory = useCallback(
    (category) => updateParams({ category: toggleListValue(selectedCategories, category).join(',') }),
    [selectedCategories, updateParams],
  )

  const toggleBrand = useCallback(
    (brand) => updateParams({ brand: toggleListValue(selectedBrands, brand).join(',') }),
    [selectedBrands, updateParams],
  )

  const applyPriceRange = useCallback(
    (min, max) => updateParams({ minPrice: min, maxPrice: max }),
    [updateParams],
  )

  const clearFilters = useCallback(
    () => updateParams({ category: '', brand: '', minPrice: '', maxPrice: '' }),
    [updateParams],
  )

  return {
    brands,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    currentPage,
    totalPages,
    pageProducts,
    filteredCount: filteredProducts.length,
    toggleCategory,
    toggleBrand,
    applyPriceRange,
    clearFilters,
    goToPage,
  }
}
