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
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="premium-store-card group relative flex flex-col overflow-hidden rounded-[2rem]"
    >
      {/* Featured badge */}
      {product.isFeatured && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-md">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
          Featured
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute left-4 top-4 z-10 rounded-full border border-emerald-200 bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/20">
          {discountPercent}% OFF
        </div>
      )}

      {/* Product image container */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden p-8">
        <div className="image-mesh-overlay absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-indigo-50/50" />
        
        {product.imageUrl ? (
          <Motion.img
            src={product.imageUrl}
            alt={product.name}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="relative z-10 h-full max-h-32 w-auto object-contain transition-transform duration-500"
          />
        ) : (
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <ShieldCheck className="h-20 w-20 text-sky-200/80" />
          </div>
        )}

        {/* Dynamic glow effect on hover */}
        <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-sky-400/20 blur-2xl transition-all duration-500 group-hover:bottom-0 group-hover:left-0 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-violet-100/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-700 backdrop-blur-sm">
            {product.brand}
          </span>
          <span className="rounded-full bg-slate-100/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-600 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        <h3 className="font-display text-base font-bold leading-tight text-slate-900 group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-500/90">
          {product.shortDescription}
        </p>

        {/* Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 border-y border-slate-100/60 py-4 text-[10px]">
          <span className="flex items-center gap-2 font-medium text-slate-600">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600">
              <Clock className="h-3 w-3" />
            </div>
            {product.duration}
          </span>
          <span className="flex items-center gap-2 font-medium text-slate-600">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
              <Monitor className="h-3 w-3" />
            </div>
            {product.deviceCount} {product.deviceCount === 1 ? 'Device' : 'Devices'}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-black tracking-tight text-slate-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs font-medium text-slate-400 line-through decoration-slate-300">
                  ₹{product.oldPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Digital Delivery</p>
            </div>
          </div>

          <button
            onClick={() => onOrderNow(product)}
            className="group/btn relative flex h-11 items-center justify-center overflow-hidden rounded-xl bg-slate-900 px-6 text-xs font-bold text-white transition-all hover:bg-sky-600 active:scale-95"
          >
            <span className="relative z-10">Order Now</span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-sky-600 to-cyan-500 opacity-0 transition-opacity group-hover/btn:opacity-100" />
          </button>
        </div>
      </div>
    </Motion.div>
  )
}
