import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductDetailSection from '../components/ProductDetailSection'
import OrderRequestModal from '../components/OrderRequestModal'
import { useProductBySlug } from '../hooks/useProducts'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { product, loading, error } = useProductBySlug(slug)
  const [orderProduct, setOrderProduct] = useState(null)

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded bg-cyber-line/50" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-80 rounded-2xl bg-cyber-panel/40" />
            <div className="space-y-4">
              <div className="h-6 w-48 rounded bg-cyber-line/50" />
              <div className="h-8 w-3/4 rounded bg-cyber-line/50" />
              <div className="h-20 rounded bg-cyber-line/30" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-lg text-cyber-muted">Product not found</p>
        <button
          onClick={() => navigate('/store')}
          className="mt-4 rounded-full bg-cyber-cyan/10 px-6 py-2 text-sm font-semibold text-cyber-cyan transition hover:bg-cyber-cyan/20"
        >
          Back to Store
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <ProductDetailSection
        product={product}
        onOrderNow={setOrderProduct}
        onBack={() => navigate('/store')}
      />

      <OrderRequestModal
        product={orderProduct}
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
      />
    </div>
  )
}
