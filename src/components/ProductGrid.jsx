import ProductCard from './ProductCard.jsx'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="text-slate-500 py-10 text-center">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
