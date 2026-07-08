function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-red-600">{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
