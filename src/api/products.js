const BASE_URL = 'https://dummyjson.com'

async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'You appear to be offline. Check your connection and try again.'
  }
  if (error instanceof TypeError) {
    return 'Unable to reach the server. Check your connection and try again.'
  }
  if (error?.status === 404) {
    return "We couldn't find what you were looking for."
  }
  if (error?.status >= 500) {
    return 'The server ran into a problem. Please try again shortly.'
  }
  return fallback
}

const LISTING_FIELDS = 'id,title,price,rating,thumbnail,category,brand'

export async function fetchAllProducts(signal) {
  const response = await fetch(`${BASE_URL}/products?limit=0&select=${LISTING_FIELDS}`, { signal })
  const data = await handleResponse(response)
  return data.products
}

export async function fetchSearchProducts(query, signal) {
  if (!query) {
    return []
  }
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=0&select=${LISTING_FIELDS}`,
    { signal },
  )
  const data = await handleResponse(response)
  return data.products
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`)
  const data = await handleResponse(response)
  return data.map((category) =>
    typeof category === 'string' ? category : category.slug,
  )
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  return handleResponse(response)
}
