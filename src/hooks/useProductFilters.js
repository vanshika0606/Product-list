import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const PAGE_SIZE = 8

export function useProductFilters(products) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const categoryParam = searchParams.get('category')
  const brandParam = searchParams.get('brand')
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const selectedCategories = useMemo(
    () => categoryParam?.split(',').filter(Boolean) || [],
    [categoryParam],
  )
  const selectedBrands = useMemo(
    () => brandParam?.split(',').filter(Boolean) || [],
    [brandParam],
  )

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

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

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
    goToPage,
  }
}
