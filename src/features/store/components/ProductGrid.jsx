import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading, error, onOrderNow }) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[2rem] border border-sky-100 bg-white/60 p-1 shadow-sm"
          >
            <div className="h-48 rounded-t-[1.9rem] bg-sky-50/50" />
            <div className="space-y-4 p-6 pt-4">
              <div className="flex gap-2">
                <div className="h-3 w-12 rounded-full bg-slate-100" />
                <div className="h-3 w-12 rounded-full bg-slate-100" />
              </div>
              <div className="h-5 w-3/4 rounded-lg bg-slate-200/60" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="h-8 w-20 rounded-lg bg-slate-200/60" />
                <div className="h-10 w-28 rounded-xl bg-slate-200/40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 py-14 text-center">
        <p className="text-base font-medium text-rose-400">Unable to load products</p>
        <p className="mt-2 max-w-xl px-4 text-sm text-rose-300/80">
          {error}
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-cyber-muted">No products found</p>
        <p className="mt-2 text-sm text-cyber-muted/60">
          Try adjusting your filters or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOrderNow={onOrderNow}
        />
      ))}
    </div>
  )
}
