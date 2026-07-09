export function parseListParam(param) {
  return param?.split(',').filter(Boolean) || []
}

export function toggleListValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function matchesFilters(product, { categorySet, brandSet, min, max }) {
  if (categorySet.size && !categorySet.has(product.category)) {
    return false
  }
  if (brandSet.size && !brandSet.has(product.brand)) {
    return false
  }
  if (min !== null && product.price < min) {
    return false
  }
  if (max !== null && product.price > max) {
    return false
  }
  return true
}

export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
