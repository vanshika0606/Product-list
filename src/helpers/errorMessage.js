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
