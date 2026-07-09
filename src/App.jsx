import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ProductListing from './pages/ProductListing.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  )
}

export default App
