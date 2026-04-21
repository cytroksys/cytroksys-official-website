import { motion as Motion } from 'framer-motion'
import { ShieldCheck, Clock, Monitor, Key, Tag, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ProductDetailSection({ product, onOrderNow, onBack }) {
  if (!product) return null

  const hasDiscount = product.oldPrice && product.oldPrice > product.price

  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm text-cyber-muted transition hover:text-cyber-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Store
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl border border-cyber-line/50 bg-gradient-to-b from-cyber-ink/80 to-cyber-panel/40 p-12">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-64 w-auto object-contain"
            />
          ) : (
            <ShieldCheck className="h-32 w-32 text-cyber-cyan/15" />
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-400">
              {product.brand}
            </span>
            <span className="rounded-md bg-cyber-line/50 px-2.5 py-1 text-xs font-medium text-cyber-muted">
              {product.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-cyber-text md:text-3xl">
            {product.name}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-cyber-muted">
            {product.fullDescription || product.shortDescription}
          </p>

          {/* Specs grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { icon: Clock, label: 'Duration', value: product.duration },
              { icon: Monitor, label: 'Devices', value: `${product.deviceCount} ${product.deviceCount === 1 ? 'Device' : 'Devices'}` },
              { icon: Tag, label: 'License', value: product.licenseType },
              { icon: Key, label: 'Delivery', value: product.deliveryType },
              { icon: Clock, label: 'Delivery Time', value: product.deliveryTime },
            ].map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-cyber-line/40 bg-cyber-panel/40 p-3"
              >
                <div className="flex items-center gap-2">
                  <spec.icon className="h-3.5 w-3.5 text-cyber-cyan" />
                  <span className="text-[10px] uppercase tracking-wider text-cyber-muted">{spec.label}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-cyber-text">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-xs uppercase tracking-[0.14em] text-cyber-cyan">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cyber-muted">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price + CTA */}
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-cyber-line/50 bg-cyber-panel/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-cyber-text">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-base text-cyber-muted line-through">
                    ₹{product.oldPrice?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-emerald-400">
                Digital key delivery within 1 hour
              </p>
            </div>
            <button
              onClick={() => onOrderNow(product)}
              className="contact-submit-btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition"
            >
              <Key className="h-4 w-4" />
              Place Order Request
            </button>
          </div>

          {/* Trust note */}
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/5 p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <p className="text-xs leading-relaxed text-emerald-400/80">
              All products are 100% genuine and sourced from authorized channels. Your digital key will be delivered to your email within 1 hour of order confirmation.
            </p>
          </div>
        </div>
      </div>
    </Motion.div>
  )
}
