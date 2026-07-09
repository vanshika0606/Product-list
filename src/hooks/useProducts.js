import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllProducts, fetchCategories, fetchSearchProducts, getErrorMessage } from '../api/products.js'

export function useProducts() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Categories rarely change and don't depend on the search query, so they're
  // fetched once instead of being re-requested on every keystroke.
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => {})
  }, [])

  const loadProducts = useCallback(
    async (signal) => {
      setLoading(true)
      setError(null)
      try {
        const productsData = query
          ? await fetchSearchProducts(query, signal)
          : await fetchAllProducts(signal)
        setProducts(productsData)
        setLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }
        setError(getErrorMessage(err, 'Failed to load products. Please try again.'))
        setLoading(false)
      }
    },
    [query],
  )

  useEffect(() => {
    const controller = new AbortController()
    loadProducts(controller.signal)
    return () => controller.abort()
  }, [loadProducts])

  return { products, categories, loading, error, reload: () => loadProducts() }
}
