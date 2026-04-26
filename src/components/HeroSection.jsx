import { motion as Motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { companyProfile } from '../data/company'
import { IconResolver } from './IconResolver'
import AnimatedCounter from './AnimatedCounter'

import HeroVisual from './HeroVisual'

const heroStats = [
  { icon: 'Code2', value: '25', suffix: '+', label: 'Projects', detail: 'Delivered', accent: '#2563EB' },
  { icon: 'Clock3', value: companyProfile.founded, label: 'Founded', detail: 'Built in India', staticValue: true, accent: '#0EA5E9' },
  { icon: 'CloudCog', value: '3', label: 'Cloud', detail: 'Platform Support', accent: '#0F766E' },
  { icon: 'ShieldCheck', value: '100', suffix: '%', label: 'Client', detail: 'Satisfaction Focus', accent: '#F97316' },
]

const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
}

const titleWord = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const descContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.6 }
  }
}

const descWord = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const orbX = useTransform(pointerX, [-400, 400], [-30, 30])
  const orbY = useTransform(pointerY, [-250, 250], [-25, 25])

  const onMove = (event) => {
    if (prefersReducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(event.clientX - (bounds.left + bounds.width / 2))
    pointerY.set(event.clientY - (bounds.top + bounds.height / 2))
  }

  const scrollToServices = () => {
    const section = document.getElementById('services')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openVyana = () => {
    window.dispatchEvent(new CustomEvent('open-vyana-chat'))
  }

  const titleText = "Build Fast. Ship Secure. Scale Beyond."
  const descText = `${companyProfile.name} designs websites, AI workflows, cloud platforms, and security systems for teams that need speed without fragile infrastructure.`

  return (
    <section
      onMouseMove={onMove}
      className="home-hero-stage hero-tone-sunset relative -mt-px overflow-hidden border-b border-cyber-line/50"
      aria-labelledby="hero-title"
    >
      <div className="hero-accent-line pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" aria-hidden="true" />

      <Motion.div
        style={{ x: orbX, y: orbY }}
        className="hero-accent-orb pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      <div className="relative mx-auto flex w-full max-w-7xl flex-col-reverse px-6 pb-20 pt-28 md:px-8 md:pb-24 md:pt-36 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-32 xl:pt-28">
        <div className="relative z-10 lg:pt-2">
          <Motion.h1
            id="hero-title"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-4xl font-display text-4xl leading-[1.1] tracking-tighter text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]"
          >
            {titleText.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                <Motion.span
                  variants={titleWord}
                  animate={{ 
                    y: [0, -4, 0],
                    transition: { 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.2
                    } 
                  }}
                  className={`inline-block mr-[0.2em] ${word.includes('Secure') || word.includes('Beyond') ? 'hero-title-gradient' : ''}`}
                >
                  {word}
                </Motion.span>
              </span>
            ))}
          </Motion.h1>

          <Motion.p
            variants={descContainer}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-cyber-muted/90 flex flex-wrap"
          >
            {descText.split(' ').map((word, i) => (
              <Motion.span key={i} variants={descWord} className="mr-[0.3em] inline-block">
                {word}
              </Motion.span>
            ))}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <button
              type="button"
              onClick={scrollToServices}
              className="hero-cta brand-cta premium-shimmer inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold uppercase tracking-wider text-cyber-ink shadow-glow/50 transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-glow/100"
            >
              Explore Services
              <IconResolver name="ArrowRight" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
            </button>
            <button
              type="button"
              onClick={openVyana}
              className="hero-secondary-cta surface-panel inline-flex items-center gap-3 rounded-full border border-cyber-line/80 bg-cyber-panel/60 backdrop-blur-sm px-8 py-4 text-base font-semibold uppercase tracking-wider text-cyber-text transition-all duration-500 hover:bg-cyber-panel/80 hover:border-cyber-line/60"
            >
              Start with Vyana
              <IconResolver name="Bot" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm uppercase tracking-[0.18em] text-cyber-muted/90"
          >
            <span className="inline-flex items-center gap-3">
              <IconResolver name="BadgeCheck" className="hero-feature-icon h-5 w-5 text-cyber-cyan/80" />
              Fixed-Scope Builds
            </span>
            <span className="inline-flex items-center gap-3">
              <IconResolver name="Clock3" className="hero-feature-icon h-5 w-5 text-cyber-cyan/80" />
              Fast Turnaround
            </span>
            <span className="inline-flex items-center gap-3">
              <IconResolver name="ShieldCheck" className="hero-feature-icon h-5 w-5 text-cyber-cyan/80" />
              Security-First Delivery
            </span>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="hero-stat-grid mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:max-w-2xl"
          >
            {heroStats.map((stat, index) => (
              <Stat key={`${stat.label}-${stat.detail}`} index={index} {...stat} />
            ))}
          </Motion.div>
        </div>

        <div className="mt-10 flex items-center justify-center lg:mt-0">
          <HeroVisual className="relative" />
        </div>
      </div>
    </section>
  )
}


function Stat({ icon, label, detail, value, suffix = '', staticValue = false, accent, index }) {
  return (
    <Motion.article
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="stat-card hero-stat-card group relative overflow-hidden rounded-[2rem] border border-cyber-line/60 bg-cyber-panel/10 backdrop-blur-lg p-6 shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-600"
      style={{ '--stat-accent': accent }}
    >
      {/* Animated Glow Effect */}
      <div className="hero-stat-glow absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 pointer-events-none"
        style={{ 
          background: `radial-gradient(ellipse at center, var(--stat-accent)15, transparent 70%)` 
        }}
      />
      
      <div className="relative z-10 flex items-start gap-4">
        <span className="hero-stat-icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyber-line/40 bg-cyber-panel/20 backdrop-blur"
          style={{ 
            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`
          }}
        >
          <IconResolver name={icon} className="h-6 w-6 text-[accent]/80 drop-shadow-[0_0_8px_color-mix(in_srgb,${accent}40%,transparent)]" />
        </span>
        <span className="min-w-0">
          <span className="hero-stat-value block font-display text-[2.25rem] font-extrabold leading-none tracking-tighter text-cyber-text"
            style={{ 
              letterWidth: '-0.02em'
            }}
          >
            {staticValue ? value : <AnimatedCounter end={value} suffix={suffix} duration={1200} />}
          </span>
          <span className="mt-2.5 block text-[13px] font-bold uppercase tracking-[0.14em] text-cyber-text/90">{label}</span>
          <span className="hero-stat-detail mt-1 block text-[13px] font-medium text-cyber-muted/90">{detail}</span>
        </span>
      </div>
      
      {/* Floating Accent Dots */}
      <div className="absolute -inset-2 pointer-events-none">
        <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-cyber-cyan/20 blur-[1px]" />
        <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-cyber-violet/20 blur-[0.5px]" />
      </div>
    </Motion.article>
  )
}
