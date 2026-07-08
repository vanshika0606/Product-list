const BASE_URL = 'https://dummyjson.com'

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

export async function fetchAllProducts() {
  const response = await fetch(`${BASE_URL}/products?limit=0`)
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
