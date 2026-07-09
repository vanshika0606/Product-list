export function getStarFillPercent(rating, star) {
  return Math.max(0, Math.min(1, rating - (star - 1))) * 100
}
