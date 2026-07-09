export function getPreviousIndex(current, length) {
  return (current - 1 + length) % length
}

export function getNextIndex(current, length) {
  return (current + 1) % length
}
