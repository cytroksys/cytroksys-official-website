import { motion as Motion } from 'framer-motion'
import { ShieldCheck, Clock, Monitor, Tag } from 'lucide-react'

export default function ProductCard({ product, onOrderNow }) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white/95 shadow-[0_14px_34px_rgba(2,132,199,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_20px_42px_rgba(14,165,233,0.22)]"
    >
      {/* Featured badge */}
      {product.isFeatured && (
        <div className="absolute right-3 top-3 z-10 rounded-full border border-sky-200 bg-sky-100 px-2.5 py-0.5 text-[10px] font-semibold text-sky-700">
          Featured
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute left-3 top-3 z-10 rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
          -{discountPercent}%
        </div>
      )}

      {/* Product image */}
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-sky-50 via-cyan-50 to-indigo-50 p-6">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShieldCheck className="h-16 w-16 text-sky-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
            {product.brand}
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {product.category}
          </span>
        </div>

        <h3 className="font-display text-sm font-semibold leading-tight text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
          {product.shortDescription}
        </p>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 text-sky-600" />
            {product.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Monitor className="h-3 w-3 text-indigo-600" />
            {product.deviceCount} {product.deviceCount === 1 ? 'Device' : 'Devices'}
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3 w-3 text-emerald-600" />
            {product.licenseType}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-slate-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-500 line-through">
                  ₹{product.oldPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[10px] font-medium text-emerald-600">Digital key • 1-hour delivery</p>
          </div>

          <button
            onClick={() => onOrderNow(product)}
            className="shrink-0 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_22px_rgba(14,165,233,0.35)] transition-all hover:brightness-105"
          >
            Order Now
          </button>
        </div>
      </div>
    </Motion.div>
  )
}
