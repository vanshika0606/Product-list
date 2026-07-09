import { httpGet } from '../helpers/https'
import { BASE_URL, LISTING_FIELDS } from '../utilities/constants.js'

export { getErrorMessage } from '../helpers/errorMessage'

export async function fetchAllProducts(signal) {
  const data = await httpGet(`${BASE_URL}/products?limit=0&select=${LISTING_FIELDS}`, { signal })
  return data.products
}

export async function fetchSearchProducts(query, signal) {
  if (!query) {
    return []
  }
  const data = await httpGet(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=0&select=${LISTING_FIELDS}`,
    { signal },
  )
  return data.products
}

export async function fetchCategories() {
  const data = await httpGet(`${BASE_URL}/products/categories`)
  return data.map((category) =>
    typeof category === 'string' ? category : category.slug,
  )
}

export async function fetchProductById(id) {
  return httpGet(`${BASE_URL}/products/${id}`)
}
