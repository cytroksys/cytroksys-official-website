import { motion as Motion } from 'framer-motion'

export default function PageHero({ title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-cyber-line/60 bg-cyber-panel/40 py-20 md:py-24">
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl font-display text-4xl text-cyber-text md:text-6xl"
        >
          {title}
        </Motion.h1>
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-cyber-muted md:text-lg"
        >
          {description}
        </Motion.p>
      </div>
    </section>
  )
}

