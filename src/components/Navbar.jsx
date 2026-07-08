function Navbar() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3">
        <button aria-label="Menu" className="p-1 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex-1 flex justify-center min-w-0">
          <div className="w-full max-w-xl flex items-center gap-2 bg-white rounded-md px-3 py-2 text-slate-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden sm:block">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden sm:block">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </header>
  )
}

export default Navbar
