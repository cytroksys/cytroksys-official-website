import { useState, useMemo } from 'react'
import StoreHero from '../components/StoreHero'
import TrustBanner from '../components/TrustBanner'
import ProductFilterBar from '../components/ProductFilterBar'
import ProductGrid from '../components/ProductGrid'
import DeliveryPromise from '../components/DeliveryPromise'
import StoreFAQ from '../components/StoreFAQ'
import OrderRequestModal from '../components/OrderRequestModal'
import { useProducts } from '../hooks/useProducts'

export default function StorePage() {
  const { products, loading, error } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [orderProduct, setOrderProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    let result = products

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q)
      )
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter)
    }

    if (brandFilter) {
      result = result.filter((p) => p.brand === brandFilter)
    }

    return result
  }, [products, searchQuery, categoryFilter, brandFilter])

  return (
    <>
      <StoreHero />
      <TrustBanner />

      {/* Products section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8">
          <h2 className="font-display text-xl text-cyber-text md:text-2xl">Our Products</h2>
          <p className="mt-1 text-sm text-cyber-muted">
            Genuine digital licenses and subscription keys
          </p>
        </div>

        <div className="mb-8">
          <ProductFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            brandFilter={brandFilter}
            onBrandChange={setBrandFilter}
          />
        </div>

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          error={error}
          onOrderNow={setOrderProduct}
        />
      </section>

      <DeliveryPromise />
      <StoreFAQ />

      <OrderRequestModal
        product={orderProduct}
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
      />
    </>
  )
}
