import { useState, useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
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
      <section className="relative overflow-hidden bg-[#fdfeff] py-20 md:py-28">
        <div className="mesh-grid-light absolute inset-0 opacity-20" />
        
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
              Explore Our <span className="text-sky-600">Digital Catalog</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
              Hand-picked premium cybersecurity licenses and utility software. 
              Authenticity guaranteed with instant delivery.
            </p>
          </Motion.div>

          <div className="mb-12">
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
        </div>
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
