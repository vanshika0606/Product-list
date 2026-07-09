async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

export async function httpGet(url, options = {}) {
  const response = await fetch(url, { ...options, method: 'GET' })
  return handleResponse(response)
}
