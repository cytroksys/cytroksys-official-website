import { motion as Motion } from 'framer-motion'
import { Shield, Zap, Key, Clock } from 'lucide-react'

export default function StoreHero() {
  return (
    <section className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-b from-white via-sky-50/55 to-indigo-50/55 py-20 md:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-300/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-sky-700" />
            <span className="text-xs font-semibold text-sky-700">Authorized Digital Reseller</span>
          </div>

          <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Genuine Software
            <span className="hero-title-gradient block">Licenses & Keys</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Premium antivirus and cybersecurity subscriptions from trusted brands.
            Order securely and receive your digital key within 1 hour.
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { icon: Key, label: 'Genuine Keys', desc: '100% authentic' },
            { icon: Clock, label: '1-Hour Delivery', desc: 'Digital delivery' },
            { icon: Shield, label: 'Secure Orders', desc: 'Encrypted data' },
            { icon: Zap, label: 'Instant Activation', desc: 'Ready to use' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-sky-100 bg-white/90 p-4 shadow-[0_8px_18px_rgba(14,165,233,0.10)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <item.icon className="h-4 w-4" />
              </div>
              <p className="text-xs font-semibold text-slate-900">{item.label}</p>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}
