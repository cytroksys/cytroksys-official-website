import { motion as Motion, useReducedMotion } from 'framer-motion'
import { IconResolver } from './IconResolver'

const techCards = [
  { icon: 'Bot', label: 'Adaptive AI', color: '#7B2FFF', x: -40, y: -60 },
  { icon: 'CloudCog', label: 'Edge Cloud', color: '#00F0FF', x: 20, y: 10 },
  { icon: 'ShieldCheck', label: 'Zero-Trust', color: '#FF8A3D', x: -20, y: 80 },
]

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center lg:h-[600px]">
      {/* Central Core Glow */}
      <Motion.div
        animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute h-64 w-64 rounded-full bg-cyber-cyan/15 blur-[100px]"
      />

      {/* Central Company Logo */}
      <Motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'backOut' }}
        className="absolute z-20 flex h-36 w-36 items-center justify-center rounded-full border border-white/5 bg-cyber-ink/20 p-4 backdrop-blur-sm shadow-glow/20"
      >
        <img 
          src="/logo.png" 
          alt="Cytroksys" 
          className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        />
      </Motion.div>

      {/* Floating Orbital Path */}
      <svg className="absolute h-full w-full opacity-20" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>
        <Motion.circle
          cx="200"
          cy="200"
          r="160"
          stroke="url(#orbit-grad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
        <Motion.circle
          cx="200"
          cy="200"
          r="140"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="10 15"
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Interactive Tech Cards */}
      <div className="relative z-10 grid gap-6">
        {techCards.map((card, i) => (
          <Motion.div
            key={card.label}
            initial={{ opacity: 0, x: card.x + 40, y: card.y }}
            animate={{ opacity: 1, x: card.x, y: card.y }}
            whileHover={{ scale: 1.05, x: card.x * 1.1, y: card.y * 1.1 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
              delay: 0.4 + i * 0.15,
            }}
            className="group absolute"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="glass-card flex min-w-[180px] items-center gap-3 border border-white/10 p-3.5 shadow-2xl backdrop-blur-xl">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-panel-soft shadow-inner"
                style={{ color: card.color }}
              >
                <IconResolver name={card.icon} className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-wider text-white">
                  {card.label}
                </p>
                <div className="mt-1 flex h-1 w-12 overflow-hidden rounded-full bg-white/5">
                  <Motion.div
                    animate={prefersReducedMotion ? {} : { x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="h-full w-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
                  />
                </div>
              </div>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Decorative Bits */}
      <Motion.div
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-10"
      >
        <div className="h-full w-full bg-cyber-grid [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      </Motion.div>
    </div>
  )
}
