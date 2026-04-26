import { motion as Motion } from 'framer-motion'
import { Shield, Zap, Key, Clock } from 'lucide-react'

export default function StoreHero() {
  return (
    <section className="relative overflow-hidden border-b border-sky-100 bg-[#fdfeff] py-24 md:py-32">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="mesh-grid-light absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[800px] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-100/40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-sky-200/60 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md">
            <Shield className="h-4 w-4 text-sky-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-sky-700">Authorized Digital Partner</span>
          </div>

          <h1 className="font-display text-5xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Genuine Software
            <span className="hero-title-gradient mt-2 block">Licensing Hub</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-500 md:text-xl">
            Secure your digital life with premium antivirus and productivity tools. 
            Instant digital keys delivered with <span className="font-bold text-sky-600">Cytroksys Assurance</span>.
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { icon: Key, label: 'Genuine Keys', desc: 'Verified Authentic', color: 'sky' },
            { icon: Clock, label: 'Fast Delivery', desc: 'Within 1 Hour', color: 'indigo' },
            { icon: Shield, label: 'Secure Order', desc: 'Encrypted Pay', color: 'cyan' },
            { icon: Zap, label: 'Easy Setup', desc: 'Instant Use', color: 'violet' },
          ].map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 rounded-[1.5rem] border border-sky-100/50 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl hover:shadow-sky-500/5"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-${item.color}-100 text-${item.color}-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-slate-900">{item.label}</p>
                <p className="mt-0.5 text-[10px] font-medium text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}
