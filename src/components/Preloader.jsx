import { motion as Motion } from 'framer-motion'

export default function Preloader() {
  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-cyber-ink"
      aria-label="Loading website"
      role="status"
    >
      <div className="space-y-5 text-center">
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.95, 1.05, 1], opacity: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-cyber-cyan/50 bg-gradient-to-br from-cyber-cyan/30 to-cyber-violet/40 font-display text-2xl tracking-wider text-white shadow-glow"
        >
          CI
        </Motion.div>
        <p className="font-display text-xs uppercase tracking-[0.24em] text-cyber-cyan/80">
          Initializing secure stack
        </p>
        <div className="h-1 w-52 overflow-hidden rounded-full bg-cyber-line/70">
          <Motion.div
            className="h-full w-full origin-left bg-gradient-to-r from-cyber-cyan to-cyber-violet"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </Motion.div>
  )
}

